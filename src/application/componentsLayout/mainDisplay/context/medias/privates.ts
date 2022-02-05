import { parse, ParsedQuery } from "query-string"
import { add, any, filter, groupBy, head, indexOf, isEmpty, isNil, last, map, prop, sort, uniq } from "rambda"
import React, { useReducer } from "react"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { ColorBadges, ControlStatus, MediaDisplay, MediaItem, RawMedia, UserBadges, UserStars } from "../../../../types"
import { mediasDisplaySlice, mediasFilteredByUrlSelector } from "./reducers"

export const toMediaItem = (response: RawMedia[]): MediaItem[] =>
  response.map((x) => ({
    id: x.id,
    fileName: x.fileName,
    width: x.metadata?.width,
    height: x.metadata?.height,
    status: x.computedQualityControl,
    controlId: x.dmapId,
    trashed: x.trashed,
    isAssociable: x.isAssociable,
  }))

// deprecated
export const getSelectedMedia = (
  selectedMediaIds: string[],
  displayedMediaIds: string[],
  mediaId: string,
  isShiftKey: boolean,
) => {
  const selectedIndex = indexOf(mediaId, displayedMediaIds)
  const lastSelectedIndex = indexOf(last(selectedMediaIds), displayedMediaIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])

  if (isShiftKey) return uniq([...selectedMediaIds, ...displayedMediaIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  const selectedMedia = selectedMediaIds.includes(mediaId)
    ? selectedMediaIds.filter((selectedId) => selectedId !== mediaId)
    : [...selectedMediaIds, mediaId]

  return selectedMedia
}

export const getSelectionBadges = (
  mediaId: string,
  isShiftKey: boolean,
  displayedMediaIds: string[],
  lastSelectedMediaId: string,
  userBadges: UserBadges,
): Partial<MediaDisplay> => {
  const selectedIndex = indexOf(mediaId, displayedMediaIds)
  const lastSelectedIndex = indexOf(lastSelectedMediaId, displayedMediaIds)
  const isReverseShift = selectedIndex < lastSelectedIndex
  const adjustement = isReverseShift ? 0 : 1
  const sortedIndexes = sort((a, b) => a - b, [selectedIndex + adjustement, lastSelectedIndex + adjustement])

  const targetMediaIds = isShiftKey ? displayedMediaIds.slice(sortedIndexes[0], sortedIndexes[1]) : [mediaId]

  const _lastSelectedMediaId = isReverseShift ? head(targetMediaIds) : last(targetMediaIds)

  let _userBadges = { ...userBadges }

  targetMediaIds.forEach((id) => {
    if (_userBadges[id]?.selected) {
      if (!isShiftKey) {
        _userBadges[id] = { ..._userBadges[id], selected: false }
      }
    } else {
      _userBadges[id] = { ...(_userBadges[id] ?? {}), selected: true }
    }
  })

  return { lastSelectedMediaId: _lastSelectedMediaId ?? "", userBadges: _userBadges }
}

export const setMultipleBadges = (
  badgeType: "color" | "stars",
  value: ColorBadges | UserStars,
  mediaId: string,
  userBadges: UserBadges,
  search: string,
) => {
  const _userBadges = { ...userBadges }

  const _selectedMediaIds = Object.keys(filter((badge) => badge.selected ?? false, userBadges))

  const targetMediaIds = _userBadges[mediaId]?.selected ? [..._selectedMediaIds, mediaId] : [mediaId]

  const currentQuery = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
  const activeFilterValues =
    badgeType === "color" ? getActiveFilters(currentQuery, "colorBadges") : getActiveFilters(currentQuery, "userStars")

  targetMediaIds.forEach((id) => {
    _userBadges[id] = { ...(_userBadges[id] ?? {}), [badgeType]: value }
    if (!activeFilterValues.includes(value)) {
      _userBadges[id] = { ..._userBadges[id], selected: false }
    }
  })

  return _userBadges
}

export const getMediaGroupedByFilter = (medias: MediaItem[], userBadges: UserBadges): Record<string, MediaItem[]> => {
  const mediasWithUserBadges = medias.map((media) => ({
    ...media,
    colorBadge: userBadges[media.id]?.color ?? ColorBadges.Grey,
    starBadge: userBadges[media.id]?.stars ?? UserStars.None,
  }))

  const mediaGroupedByStatus = groupBy(prop("status"), mediasWithUserBadges)
  const mediaGroupedByControlStatus = groupBy(
    (media) => (isNil(media.controlId) ? ControlStatus.Pending : ControlStatus.Validated),
    mediasWithUserBadges,
  )
  const mediasGroupedByColorBadge = groupBy(prop("colorBadge"), mediasWithUserBadges)
  const mediasGroupedByUserStars = groupBy(prop("starBadge"), mediasWithUserBadges)

  return {
    ...mediaGroupedByStatus,
    ...mediaGroupedByControlStatus,
    ...mediasGroupedByColorBadge,
    ...mediasGroupedByUserStars,
  }
}

export const getActiveFilters = (query: ParsedQuery<string>, filterType: string): string[] => {
  const rawStatusFilters = query[filterType] ?? []
  const activeFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]
  return activeFilters
}

export const getFilteredMedia = (
  medias: MediaItem[],
  { userBadges, search }: { userBadges: UserBadges; search: string },
): MediaItem[] => {
  const query = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })

  const statusFilters = getActiveFilters(query, "status")
  const colorBadgesFilters = getActiveFilters(query, "colorBadges")
  const textFilters = getActiveFilters(query, "textFilter")
  const controlFilter = query.control as string | null
  const binDisplay = query.bin

  const filteredMedia = medias.filter((media) => {
    const binFilterKeep = binDisplay ? media.trashed : !media.trashed

    const textFilterKeep = isEmpty(textFilters)
      ? true
      : any(
          (textFilter) => media.fileName.includes(textFilter),
          textFilters.filter((x) => x !== ""),
        )

    const statusFilterKeep = isEmpty(statusFilters) ? true : statusFilters.includes(media.status)

    const colorBadgesFilterKeep = isEmpty(colorBadgesFilters)
      ? true
      : colorBadgesFilters.includes(userBadges[media.id]?.color ?? ColorBadges.Grey)

    const controlFilterKeep = !controlFilter
      ? true
      : controlFilter === ControlStatus.Validated
      ? !isNil(media.controlId)
      : isNil(media.controlId)

    return binFilterKeep && controlFilterKeep && statusFilterKeep && textFilterKeep && colorBadgesFilterKeep
  })

  return filteredMedia
}

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const actions = mediasDisplaySlice.actions
  const location = useLocation()

  const {
    selectedMediaIds,
    transparency,
    contentSize,
    scrollRatio,
    cellMatrix,
    cardHeader,
    badges,
    whiteReplacement,
    userBadges,
  } = getState(prop("mediasDisplay"))
  const { loaded: mediaLoaded } = getState(prop("media"))
  const displayedMedias = getState((x) => mediasFilteredByUrlSelector(x, location.search))
  const isBin = location.search.includes("bin")

  const displayedMediaIds = displayedMedias.map(prop("id"))
  const [headerCellRatio, headerRatio] = cardHeader ? [1.25, 0.25] : [1, 0]

  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))

  const setSelection = (mediaId: typeof selectedMediaIds[0]) => (mouseEvent: MouseEvent) =>
    dispatch(
      actions.updateUserBadgesSelection({
        mediaId,
        isShiftKey: mouseEvent.shiftKey,
        displayedMediaIds,
      }),
    )

  const setUserBadge =
    (mediaId: string, badgeType: "color" | "stars", value: ColorBadges | UserStars) => (mouseEvent: MouseEvent) => {
      mouseEvent.stopPropagation()
      dispatch(
        actions.updateUserBadges({
          badgeType,
          value,
          mediaId,
          search: location.search,
        }),
      )
    }

  const openLightBox = (mediaId: string) => (mouseEvent: MouseEvent) => {
    mouseEvent.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediaId: mediaId }))
  }

  const [, forceUpdate] = useReducer(add(1), 0)

  return {
    mediaLoaded,
    selectedMediaIds,
    transparency,
    contentSize,
    scrollRatio,
    cellMatrix,
    badges,
    whiteReplacement,
    filteredMedia: displayedMedias,
    headerCellRatio,
    headerRatio,
    isBin,
    userBadges,
    updateScrollRatio,
    updateCellMatrix,
    setSelection,
    openLightBox,
    forceUpdate,
    setUserBadge,
  }
}
