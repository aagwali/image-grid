import { intersection, isEmpty, prop } from "rambda"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../../../storeConfig"
import { mediaDisplaySlice, mediasFilteredByUrlSelector, mediaStatusDictionarySelector } from "../reducers"
import { triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "../services"
import { RightBarShortcuts } from "../types"
import { downloadMedia } from "./download/privates"

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const location = useLocation()

  const { selectedMediaIds } = getState(prop("mediasDisplay"))
  const { label } = getState(prop("context"))
  const itemsByFilterData = getState(mediaStatusDictionarySelector)

  const filteredMedia = getState((x) => mediasFilteredByUrlSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))

  const selectionExists = !isEmpty(selectedMediaIds)
  const isBin = location.search.includes("bin")

  const pendingIdsInSelection = intersection(itemsByFilterData.pending?.map(prop("id")) ?? [], selectedMediaIds)

  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectedMediaIds: filteredMediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectedMediaIds: [] }))
  const updateUploadProgress = (uploadProgress: number) => dispatch(actions.updateMediaDisplay({ uploadProgress }))

  const [trashMedia] = triggerTrashMedia.useMutation()
  const [restoreMedia] = triggerRestoreMedia.useMutation()
  const [uploadMedia] = triggerUploadMedia.useMutation()

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
    if (hotkey === RightBarShortcuts.Restore) {
      restoreMedia(selectedMediaIds)
      deselectAll()
    }

    if (hotkey === RightBarShortcuts.Download && !isEmpty(selectedMediaIds)) {
      downloadMedia(selectedMediaIds, label)
      deselectAll()
    }
  }

  return {
    selectedMediaIds,
    label,
    filteredMediaIds,
    selectionExists,
    isBin,
    pendingIdsInSelection,
    selectAll,
    deselectAll,
    updateUploadProgress,
    trashMedia,
    restoreMedia,
    uploadMedia,
    handleHotkey,
  }
}
