import { isEmpty, prop } from "rambda"

import { useAppDispatch, useAppSelector as getState } from "../../../../../../storeConfig"
import { triggerPatchReference } from "../../../../../services"
import { referencesDisplaySlice, referencesSelector } from "../reducers"
import { RightBarShortcuts } from "../types"

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = referencesDisplaySlice

  const { selectedReferenceIds } = getState(prop("referencesDisplay"))

  const filteredReferences = getState(referencesSelector.selectAll)
  const filteredReferencesIds = filteredReferences.map(prop("id"))

  const selectionExists = !isEmpty(selectedReferenceIds)

  const selectAll = () => dispatch(actions.updateReferencesDisplay({ selectedReferenceIds: filteredReferencesIds }))
  const deselectAll = () => dispatch(actions.updateReferencesDisplay({ selectedReferenceIds: [] }))

  const [patchReference] = triggerPatchReference.useMutation()
  const dissociate = () => patchReference({ referenceIds: selectedReferenceIds, value: { mediaAssociations: [] } })

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
  }

  return {
    selectedReferenceIds,
    filteredReferencesIds,
    selectionExists,
    selectAll,
    deselectAll,
    dissociate,
    handleHotkey,
  }
}
