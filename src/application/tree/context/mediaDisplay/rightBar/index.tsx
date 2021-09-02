import { isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice, mediaSelector } from "../../../../reducers"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DeselectAllIcon,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  SideBarBox,
} from "../styles"
import { RightBarShortcuts } from "../types"

const MediaDisplayRightBar = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { selectMediaIds } = getState(prop("mediaDisplay"))
  const mediaIds = getState(mediaSelector.selectIds) as string[]

  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
  }

  return (
    <SideBarBox>
      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />
      <Accordion allowMultiple>
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
              <RightBarActionBox
                enabled={!isEmpty(selectMediaIds) ? "true" : "false"}
                spacing={1}
                onClick={deselectAll}
              >
                <DeselectAllIcon />
                <AppToolTip tooltip="deselectAll">
                  <RightBarAction children={"Deselect all medias"} />
                </AppToolTip>
              </RightBarActionBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </SideBarBox>
  )
}

export default MediaDisplayRightBar
