import { prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, Center, Checkbox, Stack } from "@chakra-ui/react"
import { navigate, useLocation } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import SizeSlider from "../../../../dynamicGrid/sizeSlider"
import { CardBadge, Ellipsis } from "../../../../imageCard/styles"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice } from "../../../../reducers"
import { QualityStatus } from "../../../../types"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DisplayCheckboxGroup,
  LeftBarLabel,
  LeftBarLabelTitle,
  SeparatorBox,
  SideBarBox,
} from "../styles"
import { LeftBarShortcuts } from "../types"
import { isFilterActive, toggleStatusFilter } from "./privates"

const MediaDisplayLeftBar = ({ forceUpdate }: any) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const location = useLocation()

  const { transparency, contentSize, cellMatrix, cardHeader, badges } = getState(prop("mediaDisplay"))

  const allChecked = [cardHeader, badges, transparency].every(Boolean)
  const isIndeterminate = [cardHeader, badges, transparency].some(Boolean) && !allChecked
  const toggleCardHeader = () => dispatch(actions.updateMediaDisplay({ cardHeader: !cardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateMediaDisplay({ badges: !badges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(actions.updateMediaDisplay({ cardHeader: checked, badges: checked, transparency: checked }))
  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaDisplay({ contentSize: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === LeftBarShortcuts.Transparency) toggleTransparency()
    if (hotkey === LeftBarShortcuts.DisplayInfos) toggleCardHeader()
    if (hotkey === LeftBarShortcuts.DisplayBadges) toggleCardBadges()
  }

  return (
    <SideBarBox>
      <SeparatorBox />
      <Hotkeys keyName={getHotkeys(LeftBarShortcuts)} onKeyDown={handleHotkey} />

      <Accordion allowToggle>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle flex="1" textAlign="left" children={"Display options"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack mt={3} spacing={8}>
              <Stack>
                <Center>
                  <AppToolTip tooltip="zoom">
                    <LeftBarLabelTitle children={"Images Zoom"} />
                  </AppToolTip>
                </Center>
                <SizeSlider
                  sliderStepCount={10}
                  contentSizeRange={[130, 330]}
                  contentSize={contentSize}
                  updateContentSize={updateContentSize}
                  updateCellMatrix={updateCellMatrix}
                  forceUpdate={forceUpdate}
                />
              </Stack>
              <DisplayCheckboxGroup>
                <Checkbox
                  size={"sm"}
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => toggleDisplayOptions(e.target.checked)}
                >
                  <LeftBarLabelTitle children={"Images information"} />
                </Checkbox>
                <Stack pl={6} spacing={1}>
                  <Checkbox isChecked={cardHeader} size={"sm"} onChange={toggleCardHeader}>
                    <AppToolTip tooltip="filename">
                      <LeftBarLabel children={"Filename"} />
                    </AppToolTip>
                  </Checkbox>
                  <Checkbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
                    <AppToolTip tooltip="badges">
                      <LeftBarLabel children={"Badges"} />
                    </AppToolTip>
                  </Checkbox>
                  <Checkbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
                    <AppToolTip tooltip="transparency">
                      <LeftBarLabel children={"Transparency"} />
                    </AppToolTip>
                  </Checkbox>
                </Stack>
              </DisplayCheckboxGroup>
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle flex="1" textAlign="left" children={"Filters"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack spacing={8}>
              <DisplayCheckboxGroup>
                <Checkbox
                  size={"sm"}
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => toggleDisplayOptions(e.target.checked)}
                >
                  <LeftBarLabelTitle children={"Badges"} />
                </Checkbox>
                <Stack mt={1} pl={6} spacing={2}>
                  <Checkbox
                    isChecked={isFilterActive(location, QualityStatus.High)}
                    size={"sm"}
                    onChange={() => navigate(`medias${toggleStatusFilter(location, QualityStatus.High)}`)}
                  >
                    <CardBadge size={240} badge={QualityStatus.High}>
                      <Ellipsis size={240}>Size</Ellipsis>
                    </CardBadge>
                  </Checkbox>
                  <Checkbox
                    isChecked={isFilterActive(location, QualityStatus.Medium)}
                    size={"sm"}
                    onChange={() => navigate(`medias${toggleStatusFilter(location, QualityStatus.Medium)}`)}
                  >
                    <CardBadge size={240} badge={QualityStatus.Medium}>
                      <Ellipsis size={240}>Size</Ellipsis>
                    </CardBadge>
                  </Checkbox>
                  <Checkbox
                    isChecked={isFilterActive(location, QualityStatus.Low)}
                    size={"sm"}
                    onChange={() => navigate(`medias${toggleStatusFilter(location, QualityStatus.Low)}`)}
                  >
                    <CardBadge size={240} badge={QualityStatus.Low}>
                      <Ellipsis size={240}>Size</Ellipsis>
                    </CardBadge>
                  </Checkbox>
                  <Checkbox
                    isChecked={isFilterActive(location, QualityStatus.Manual)}
                    size={"sm"}
                    onChange={() => navigate(`medias${toggleStatusFilter(location, QualityStatus.Manual)}`)}
                  >
                    <CardBadge size={240} badge={QualityStatus.Manual}>
                      <Ellipsis size={240}>Size</Ellipsis>
                    </CardBadge>
                  </Checkbox>
                  <Checkbox
                    isChecked={isFilterActive(location, QualityStatus.High)}
                    size={"sm"}
                    onChange={() => navigate(`medias${toggleStatusFilter(location, QualityStatus.High)}`)}
                  >
                    <CardBadge size={240} badge={"Control"}>
                      <Ellipsis size={240}>Control</Ellipsis>
                    </CardBadge>
                  </Checkbox>
                </Stack>
              </DisplayCheckboxGroup>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </SideBarBox>
  )
}

export default MediaDisplayLeftBar
