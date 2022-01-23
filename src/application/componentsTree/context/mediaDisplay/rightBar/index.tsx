import { intersection, isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"
import { useLocation } from "react-router-dom"

import { Accordion, Stack } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import PanelItems from "../../../../components/panelItems"
import { getHotkeys } from "../../../../privates"
import { mediaByFilterSelector, mediaDisplaySlice, mediaFilteredSelector } from "../../../../reducers"
import { triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "../../../../services"
import { Separator, SideBar } from "../styles"
import { RightBarShortcuts } from "../types"
import DeselectAllItem from "./deselectAll"
import DownloadItem from "./download"
import { downloadMedia } from "./download/privates"
import DropZone from "./dropzone"
import RestoreItem from "./restore"
import SelectAllItem from "./selectAll"
import TrashItem from "./trash"

const MediaDisplayRightBar = () => {
  //#region container
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const location = useLocation()

  const { selectedMediaIds } = getState(prop("mediaDisplay"))
  const { label } = getState(prop("context"))
  const itemsByFilterData = getState(mediaByFilterSelector)

  const filteredMedia = getState((x) => mediaFilteredSelector(x, location.search))
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
  //#endregion

  return (
    <SideBar>
      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />

      <Separator />
      <Accordion defaultIndex={[1]} allowMultiple>
        <PanelItems title={`Selection ${selectedMediaIds.length} / ${filteredMediaIds.length}`}>
          <Stack mt={0} spacing={4}>
            <SelectAllItem selectAll={selectAll} />
            <DeselectAllItem selectionExists={selectionExists} deselectAll={deselectAll} />
          </Stack>
        </PanelItems>
        {selectionExists && (
          <PanelItems title={"Actions"}>
            <Stack mt={0} spacing={4}>
              {!isBin && <DownloadItem selectedMediaIds={selectedMediaIds} label={label} deselectAll={deselectAll} />}

              {!isBin && (
                <TrashItem
                  selectedMediaIds={selectedMediaIds}
                  pendingIdsInSelection={pendingIdsInSelection}
                  trashMedia={trashMedia}
                  deselectAll={deselectAll}
                />
              )}

              {isBin && (
                <RestoreItem
                  selectedMediaIds={selectedMediaIds}
                  restoreMedia={restoreMedia}
                  deselectAll={deselectAll}
                />
              )}
            </Stack>
          </PanelItems>
        )}
      </Accordion>
      {!isBin && <DropZone label={label} uploadMedia={uploadMedia} updateUploadProgress={updateUploadProgress} />}
    </SideBar>
  )
}

export default MediaDisplayRightBar
