import { parse, ParsedQuery } from "query-string"
import { add, any, groupBy, indexOf, isEmpty, isNil, last, map, prop, sort, uniq } from "rambda"
import React, { useReducer } from "react"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { ColorBadges, ControlStatus, MediaItem, RawMedia, UserBadges, UserStars } from "../../../../types"
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

export const getSelectedMedia = (
  selectedMediaIds: string[],
  mediaIds: string[],
  mediaId: string,
  event: MouseEvent | KeyboardEvent,
) => {
  const selectedIndex = indexOf(mediaId, mediaIds)
  const lastSelectedIndex = indexOf(last(selectedMediaIds), mediaIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])

  if (event.shiftKey) return uniq([...selectedMediaIds, ...mediaIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectedMediaIds.includes(mediaId)
    ? selectedMediaIds.filter((selectedId) => selectedId !== mediaId)
    : [...selectedMediaIds, mediaId]
}

export const getMediaGroupedByFilter = (
  medias: MediaItem[],
  userBadges: Record<string, UserBadges>,
): Record<string, MediaItem[]> => {
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

const getActiveFilters = (query: ParsedQuery<string>, filterType: string): string[] => {
  const rawStatusFilters = query[filterType] ?? []
  const activeFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]
  return activeFilters
}

export const getFilteredMedia = (
  medias: MediaItem[],
  { userBadges, search }: { userBadges: Record<string, UserBadges>; search: string },
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

const setMultipleBadges = (
  badgeType: "color" | "stars",
  ids: string[],
  value: ColorBadges | UserStars,
  userBadges: Record<string, UserBadges>,
) => {
  const newUserBadges = { ...userBadges }

  ids.forEach((id) => {
    newUserBadges[id]
      ? (newUserBadges[id] = { ...newUserBadges[id], [badgeType]: value })
      : (newUserBadges[id] = { [badgeType]: value })
  })

  return newUserBadges
}

export const getContainerProps = () => {
  const dispatch = useAppDispatch()

  const actions = mediasDisplaySlice.actions

  const { loaded: mediaLoaded } = getState(prop("media"))
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

  const filteredMedia = getState((x) => mediasFilteredByUrlSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))
  const [headerCellRatio, headerRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const search = useLocation().search
  const isBin = search.includes("bin")

  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (media: typeof selectedMediaIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateMediaDisplay({
        selectedMediaIds: getSelectedMedia(selectedMediaIds, filteredMediaIds, media, event),
      }),
    )
  const openLightBox = (mediaId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediaId: mediaId }))
  }

  const setUserBadge =
    (mediaId: string) => (badgeType: "color" | "stars", value: ColorBadges | UserStars) => (e: MouseEvent) => {
      e.stopPropagation()
      const targets = selectedMediaIds.includes(mediaId) ? [...selectedMediaIds, mediaId] : [mediaId]
      const newUserBadges = setMultipleBadges(badgeType, targets, value, userBadges)
      dispatch(
        actions.updateMediaDisplay({
          userBadges: newUserBadges,
        }),
      )

      // exclude items if not in active selection anymore :
      const currentQuery = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
      const activeFilterValues =
        badgeType === "color"
          ? getActiveFilters(currentQuery, "colorBadges")
          : getActiveFilters(currentQuery, "userStars")

      if (!activeFilterValues.includes(value))
        dispatch(
          actions.updateMediaDisplay({
            selectedMediaIds: selectedMediaIds.filter((id) => !targets.includes(id)),
          }),
        )
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
    filteredMedia,
    headerCellRatio,
    headerRatio,
    isBin,
    userBadges,
    updateScrollRatio,
    updateCellMatrix,
    selectionHandler,
    openLightBox,
    forceUpdate,
    setUserBadge,
  }
}
