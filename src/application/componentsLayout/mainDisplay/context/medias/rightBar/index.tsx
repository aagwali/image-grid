import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, Stack } from "@chakra-ui/react"

import PanelItems from "../../../../../components/accordionItem"
import DeselectAllItem from "../../../../../components/deselectAllItem"
import SelectAllItem from "../../../../../components/selectAllItem"
import { getHotkeys } from "../../../../../privates"
import { Separator, SideBar } from "../../styles"
import { RightBarShortcuts } from "../types"
import DownloadItem from "./download"
import DropZone from "./dropzone"
import { getContainerProps } from "./privates"
import RestoreItem from "./restore"
import TrashItem from "./trash"

const MediaRightBar = () => {
  const {
    label,
    selectionExists,
    selectedMediaIds,
    filteredMediaIds,
    pendingIdsInSelection,
    isBin,
    selectAll,
    deselectAll,
    updateUploadProgress,
    trashMedia,
    restoreMedia,
    uploadMedia,
    handleHotkey,
  } = getContainerProps()

  return (
    <SideBar>
      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />

      <Separator />
      <Accordion defaultIndex={[1]} allowMultiple>
        <PanelItems title={`Selection ${selectedMediaIds.length} / ${filteredMediaIds.length}`}>
          <Stack mt={0} spacing={4}>
            <SelectAllItem selectAll={selectAll} entity={"medias"} />

            <DeselectAllItem selectionExists={selectionExists} deselectAll={deselectAll} entity={"media"} />
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

export default MediaRightBar