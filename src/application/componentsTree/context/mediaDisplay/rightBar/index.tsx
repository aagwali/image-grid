import { intersection, isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"
import { useLocation } from "react-router-dom"

import {
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../components/appTooltip"
import DropZone from "../../../../components/dropzone"
import { getHotkeys } from "../../../../privates"
import { mediaByFilterSelector, mediaDisplaySlice, mediaFilteredSelector } from "../../../../reducers"
import { triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "../../../../services"
import {
  AccordionButtonBox,
  DeselectAllIcon,
  DownloadIcon,
  PopOverConfirm,
  RedButton,
  RestoreIcon,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  SeparatorBox,
  SideBarBox,
  SideBarSubTitle,
  SideBarTitle,
  TealButton,
  TrashIcon,
} from "../styles"
import { RightBarShortcuts } from "../types"
import { downloadMedia } from "./privates"

const MediaDisplayRightBar = () => {
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

  return (
    <SideBarBox>
      <SeparatorBox />

      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <SideBarTitle
              flex="1"
              textAlign="left"
              children={`Selection ${selectedMediaIds.length} / ${filteredMediaIds.length}`}
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
              <SideBarTitle flex="1" textAlign="left" children={"Actions"} />
            </AccordionButtonBox>
            <AccordionPanel>
              <Stack mt={0} spacing={4}>
                {!isBin && (
                  <RightBarActionBox
                    spacing={1}
                    onClick={() => {
                      downloadMedia(selectedMediaIds, label)
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
                  <Popover>
                    <PopoverTrigger>
                      <RightBarActionBox spacing={1}>
                        <RedButton size="sm" variant="outline">
                          <HStack spacing={1}>
                            <TrashIcon />
                            <Text children={"Move to bin"} />
                          </HStack>
                        </RedButton>
                      </RightBarActionBox>
                    </PopoverTrigger>
                    <Portal>
                      <PopOverConfirm>
                        <PopoverArrow />
                        <PopoverHeader bg="gray.50">
                          <SideBarTitle children={"Move to bin confirmation"} />
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Box m={2}>
                            {pendingIdsInSelection.length !== 0 && (
                              <SideBarSubTitle
                                children={`${pendingIdsInSelection.length} pending medias will be moved to bin`}
                              />
                            )}
                            {selectedMediaIds.length - pendingIdsInSelection.length !== 0 && (
                              <SideBarSubTitle
                                children={`${
                                  selectedMediaIds.length - pendingIdsInSelection.length
                                } validated medias will remain unchanged`}
                              />
                            )}
                          </Box>
                        </PopoverBody>
                        <PopoverFooter bg="gray.50">
                          <Center>
                            <RightBarActionBox
                              spacing={1}
                              onClick={() => {
                                trashMedia(intersection(selectedMediaIds, pendingIdsInSelection))
                                deselectAll()
                              }}
                            >
                              <RedButton size="sm" variant="outline">
                                <HStack spacing={1}>
                                  <TrashIcon />
                                  <Text children={"Move to bin"} />
                                </HStack>
                              </RedButton>
                            </RightBarActionBox>
                          </Center>
                        </PopoverFooter>
                      </PopOverConfirm>
                    </Portal>
                  </Popover>
                )}

                {isBin && (
                  <RightBarActionBox
                    spacing={1}
                    onClick={() => {
                      restoreMedia(selectedMediaIds)
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
