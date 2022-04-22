import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, Stack } from "@chakra-ui/react"

import { getHotkeys } from "../../../../../../privates"
import AccordionItem from "../../../../../accordionItem"
import DeselectAllItem from "../../../../../deselectAllItem"
import SelectAllItem from "../../../../../selectAllItem"
import { Separator, SideBar } from "../../styles"
import DownloadItem from "./download"
import DropZone from "./dropzone"
import { getContainerProps } from "./privates"
import RestoreItem from "./restore"
import TrashItem from "./trash"
import { RightBarShortcuts } from "./types"

const MediaRightBar = () => {
  const {
    label,
    selectionExists,
    selectedMediaIds,
    displayedMediaIds,
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
        <AccordionItem title={`Selection ${selectedMediaIds.length} / ${displayedMediaIds.length}`}>
          <Stack mt={0} spacing={4}>
            <SelectAllItem selectAll={selectAll} entity={"medias"} />

            <DeselectAllItem selectionExists={selectionExists} deselectAll={deselectAll} entity={"media"} />
          </Stack>
        </AccordionItem>

        {selectionExists && (
          <AccordionItem title={"Actions"}>
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
          </AccordionItem>
        )}
      </Accordion>

      {!isBin && <DropZone label={label} uploadMedia={uploadMedia} updateUploadProgress={updateUploadProgress} />}
    </SideBar>
  )
}

export default MediaRightBar
