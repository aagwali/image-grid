import { isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, HStack, Stack, Text } from "@chakra-ui/react"
import { useLocation } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import DropZone from "../../../../dropzone"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice, mediaFilteredSelector } from "../../../../reducers"
import { triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "../../../../services"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DeselectAllIcon,
  DownloadIcon,
  RedButton,
  RestoreIcon,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  SeparatorBox,
  SideBarBox,
  TealButton,
  TrashIcon,
} from "../styles"
import { RightBarShortcuts } from "../types"
import { downloadMedia } from "./privates"

const MediaDisplayRightBar = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const location = useLocation()

  const { selectMediaIds } = getState(prop("mediaDisplay"))
  const { label } = getState(prop("context"))
  const filteredMedia = getState((x) => mediaFilteredSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))

  const selectionExists = !isEmpty(selectMediaIds)
  const isBin = location.search.includes("bin")

  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: filteredMediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))
  const updateUploadProgress = (uploadProgress: number) => dispatch(actions.updateMediaDisplay({ uploadProgress }))

  const [trashMedia] = triggerTrashMedia.useMutation()
  const [restoreMedia] = triggerRestoreMedia.useMutation()
  const [uploadMedia] = triggerUploadMedia.useMutation()

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
    if (hotkey === RightBarShortcuts.Restore) {
      restoreMedia(selectMediaIds)
      deselectAll()
    }
    if (hotkey === RightBarShortcuts.Trash) {
      trashMedia(selectMediaIds)
      deselectAll()
    }
    if (hotkey === RightBarShortcuts.Download && !isEmpty(selectMediaIds)) {
      downloadMedia(selectMediaIds)
      deselectAll()
    }
  }

  return (
    <SideBarBox>
      <SeparatorBox />

      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle
              flex="1"
              textAlign="left"
              children={`Selection ${selectMediaIds.length} / ${filteredMediaIds.length}`}
            />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack mt={0} spacing={4}>
              <RightBarActionBox spacing={1} onClick={selectAll}>
                <SelectAllIcon />
                <AppToolTip tooltip="selectAll">
                  <RightBarAction children={"Select all medias"} />
                </AppToolTip>
              </RightBarActionBox>
              <RightBarActionBox enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
                <DeselectAllIcon />
                <AppToolTip tooltip="deselectAll">
                  <RightBarAction children={"Deselect all medias"} />
                </AppToolTip>
              </RightBarActionBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        {selectionExists && (
          <AccordionItem borderWidth={0}>
            <AccordionButtonBox>
              <AccordionIcon />
              <AccordionButtonTitle flex="1" textAlign="left" children={"Actions"} />
            </AccordionButtonBox>
            <AccordionPanel>
              <Stack mt={0} spacing={4}>
                {!isBin && (
                  <RightBarActionBox
                    spacing={1}
                    onClick={() => {
                      downloadMedia(selectMediaIds)
                      deselectAll()
                    }}
                  >
                    <AppToolTip tooltip="download media">
                      <TealButton size="sm" variant="outline">
                        <HStack spacing={1}>
                          <DownloadIcon />
                          <Text children={"Download"} />
                        </HStack>
                      </TealButton>
                    </AppToolTip>
                  </RightBarActionBox>
                )}
                {!isBin && (
                  <RightBarActionBox
                    spacing={1}
                    onClick={() => {
                      trashMedia(selectMediaIds)
                      deselectAll()
                    }}
                  >
                    <AppToolTip tooltip="trash">
                      <RedButton size="sm" variant="outline">
                        <HStack spacing={1}>
                          <TrashIcon />
                          <Text children={"Move to bin"} />
                        </HStack>
                      </RedButton>
                    </AppToolTip>
                  </RightBarActionBox>
                )}
                {isBin && (
                  <RightBarActionBox
                    spacing={1}
                    onClick={() => {
                      restoreMedia(selectMediaIds)
                      deselectAll()
                    }}
                  >
                    <AppToolTip tooltip="restore">
                      <TealButton size="sm" variant="outline">
                        <HStack spacing={1}>
                          <RestoreIcon />
                          <Text children={"Restore"} />
                        </HStack>
                      </TealButton>
                    </AppToolTip>
                  </RightBarActionBox>
                )}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
      {!isBin && <DropZone label={label} uploadMedia={uploadMedia} updateUploadProgress={updateUploadProgress} />}
    </SideBarBox>
  )
}

export default MediaDisplayRightBar
