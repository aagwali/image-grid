import { add, indexOf, last, prop, sort, uniq } from "rambda"
import React, { useReducer } from "react"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import { mediaDisplaySlice, mediaFilteredSelector } from "../../../reducers"

export const getSelectedMedia = (
  selectedMediaIds: string[],
  mediaIds: string[],
  mediumId: string,
  event: MouseEvent | KeyboardEvent,
) => {
  const selectedIndex = indexOf(mediumId, mediaIds)
  const lastSelectedIndex = indexOf(last(selectedMediaIds), mediaIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])

  if (event.shiftKey) return uniq([...selectedMediaIds, ...mediaIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectedMediaIds.includes(mediumId)
    ? selectedMediaIds.filter((selectedId) => selectedId !== mediumId)
    : [...selectedMediaIds, mediumId]
}

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectedMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges, whiteReplacement } =
    getState(prop("mediaDisplay"))

  const filteredMedia = getState((x) => mediaFilteredSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))
  const [headerCellRatio, headerRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const isBin = useLocation().search.includes("bin")

  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (medium: typeof selectedMediaIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateMediaDisplay({
        selectedMediaIds: getSelectedMedia(selectedMediaIds, filteredMediaIds, medium, event),
      }),
    )
  const openLightBox = (mediumId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediumId: mediumId }))
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
