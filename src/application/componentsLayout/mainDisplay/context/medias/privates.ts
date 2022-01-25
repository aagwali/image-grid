import { parse } from "query-string"
import { add, any, groupBy, indexOf, isEmpty, isNil, last, prop, sort, uniq } from "rambda"
import React, { useReducer } from "react"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { ControlStatus, MediaItem, RawMedia } from "../../../../types"
import { mediaDisplaySlice, mediasFilteredByUrlSelector } from "./reducers"

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

export const getMediaGroupedByFilter = (media: MediaItem[]): Record<string, MediaItem[]> => {
  const mediaGroupedByStatus = groupBy(prop("status"), media)
  const mediaGroupedByControlStatus = groupBy(
    (media) => (isNil(media.controlId) ? ControlStatus.Pending : ControlStatus.Validated),
    media,
  )
  return { ...mediaGroupedByStatus, ...mediaGroupedByControlStatus }
}

export const getFilteredMedia = (media: MediaItem[], search: string): MediaItem[] => {
  const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })

  const rawStatusFilters = queryObjectParameters.status ?? []
  const statusFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]

  const controlFilter = queryObjectParameters.control as string | null

  const rawTextFilter = queryObjectParameters.textFilter ?? []
  const textFilters = Array.isArray(rawTextFilter) ? rawTextFilter : [rawTextFilter]

  const binDisplay = queryObjectParameters.bin

  const filteredMedia = media.filter((media) => {
    const binFilterKeep = binDisplay ? media.trashed : !media.trashed

    const textFilterKeep = isEmpty(textFilters)
      ? true
      : any(
          (textFilter) => media.fileName.includes(textFilter),
          textFilters.filter((x) => x !== ""),
        )

    const statusFilterKeep = isEmpty(statusFilters) ? true : statusFilters.includes(media.status)
    const controlFilterKeep = !controlFilter
      ? true
      : controlFilter === ControlStatus.Validated
      ? !isNil(media.controlId)
      : isNil(media.controlId)

    return binFilterKeep && controlFilterKeep && statusFilterKeep && textFilterKeep
  })

  return filteredMedia
}

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectedMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges, whiteReplacement } =
    getState(prop("mediasDisplay"))

  const filteredMedia = getState((x) => mediasFilteredByUrlSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))
  const [headerCellRatio, headerRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const isBin = useLocation().search.includes("bin")

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
    updateScrollRatio,
    updateCellMatrix,
    selectionHandler,
    openLightBox,
    forceUpdate,
  }
}
