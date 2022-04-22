import { add, identity, indexOf, isNil, last, prop, reject, sort, uniq } from "rambda"
import { useReducer } from "react"

import { useAppDispatch, useAppSelector as getState } from "../../../../../../storeConfig"
import { PaginatedResponse, RawReference, ReferenceItem } from "../../../../../types"
import { mediaSelector } from "../medias/reducers"
import { referencesDisplaySlice, referencesSelector } from "./reducers"

export const rawToReferenceItem = (rawReference: Partial<RawReference>): Partial<ReferenceItem> => {
  return reject(isNil, {
    id: rawReference.id,
    familyId: rawReference.familyId ? String(rawReference.familyId) : rawReference.familyId,
    mediaAssociations: rawReference.mediaAssociations,
  })
}

export const paginatedToReferenceItem = (response: PaginatedResponse<RawReference>): ReferenceItem[] =>
  response.items.map((x) => ({
    id: x.id,
    familyId: String(x.familyId),
    mediaAssociations: x.mediaAssociations,
  }))

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
  const { badges, transparency, whiteReplacement, cardHeader, userBadges } = getState(prop("mediasDisplay"))
  const references = getState(referencesSelector.selectAll)
  const state = getState(identity)

  const mediaHeaderRatio = cardHeader ? 0.25 : 0
  const headerCellRatio = cardHeader ? 2 : 1.75
  const bodyCellRatio = cardHeader ? 1.35 : 1.1

  const filteredReferencesIds = references.map(prop("id"))

  const setSelection = (referenceId: typeof selectedReferenceIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateReferencesDisplay({
        selectedReferenceIds: getSelectedReferences(selectedReferenceIds, filteredReferencesIds, referenceId, event),
      }),
    )

  const getMediaById = (mediaId: string) => mediaSelector.selectById(state, mediaId)

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
    userBadges,
    setSelection,
    getMediaById,
    forceUpdate,
  }
}
