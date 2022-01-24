import { add, identity, indexOf, last, prop, sort, uniq } from "rambda"
import { useReducer } from "react"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { mediaSelector } from "../medias/reducers"
import { referencesDisplaySlice, referencesSelector } from "./reducers"

export const getSelectedReferences = (
  selectedReferenceIds: string[],
  referencesIds: string[],
  referenceId: string,
  event: MouseEvent | KeyboardEvent,
): string[] => {
  const selectedIndex = indexOf(referenceId, referencesIds)
  const lastSelectedIndex = indexOf(last(selectedReferenceIds), referencesIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])
  if (event.shiftKey)
    return uniq([...selectedReferenceIds, ...referencesIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectedReferenceIds.includes(referenceId)
    ? selectedReferenceIds.filter((selectedId) => selectedId !== referenceId)
    : [...selectedReferenceIds, referenceId]
}
export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = referencesDisplaySlice

  const { loaded: referencesLoaded } = getState(prop("references"))
  const { contentSize, selectedReferenceIds } = getState(prop("referencesDisplay"))
  const { badges, transparency, whiteReplacement, cardHeader } = getState(prop("mediasDisplay"))
  const references = getState(referencesSelector.selectAll)
  const state = getState(identity)

  const mediaHeaderRatio = cardHeader ? 0.25 : 0
  const headerCellRatio = cardHeader ? 2 : 1.75
  const bodyCellRatio = cardHeader ? 1.35 : 1.1

  const filteredReferencesIds = references.map(prop("id"))

  const selectionHandler = (referenceId: typeof selectedReferenceIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateReferencesDisplay({
        selectedReferenceIds: getSelectedReferences(selectedReferenceIds, filteredReferencesIds, referenceId, event),
      }),
    )

  const getMediaById = (mediumId: string) => mediaSelector.selectById(state, mediumId)

  const [, forceUpdate] = useReducer(add(1), 0)

  return {
    referencesLoaded,
    references,
    mediaBadges: badges,
    mediaTransparency: transparency,
    mediaWhiteReplacement: whiteReplacement,
    contentSize,
    selectedReferenceIds,
    mediaHeaderRatio,
    headerCellRatio,
    bodyCellRatio,
    selectionHandler,
    getMediaById,
    forceUpdate,
  }
}
