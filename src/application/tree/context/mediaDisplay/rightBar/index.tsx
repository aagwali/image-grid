import { isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, HStack, Stack, Text } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice, mediaSelector } from "../../../../reducers"
import { triggerDownloadMedia } from "../../../../services"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DeselectAllIcon,
  DownloadIcon,
  RedButton,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  SeparatorBox,
  SideBarBox,
  TealButton,
  TrashIcon,
} from "../styles"
import { RightBarShortcuts } from "../types"

const MediaDisplayRightBar = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { selectMediaIds } = getState(prop("mediaDisplay"))
  const mediaIds = getState(mediaSelector.selectIds) as string[]

  const selectionExists = !isEmpty(selectMediaIds)

  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))

  const [downloadMedia] = triggerDownloadMedia.useMutation()

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
    // if (hotkey === RightBarShortcuts.Download && !isEmpty(selectMediaIds)) downloadMedia(selectMediaIds)
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
              children={`Selection ${selectMediaIds.length} / ${mediaIds.length}`}
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
                <RightBarActionBox
                  spacing={1}
                  onClick={() => {
                    console.log("Fix me - server response must be json/text")
                    // downloadMedia(selectMediaIds)
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
                <RightBarActionBox spacing={1} onClick={deselectAll}>
                  <AppToolTip tooltip="trash media">
                    <RedButton size="sm" variant="outline">
                      <HStack spacing={1}>
                        <TrashIcon />
                        <Text children={"Move to bin"} />
                      </HStack>
                    </RedButton>
                  </AppToolTip>
                </RightBarActionBox>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </SideBarBox>
  )
}

export default MediaDisplayRightBar
