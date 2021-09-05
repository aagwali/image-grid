import { all, any, identity, intersection, isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import {
  Accordion,
  AccordionIcon,
  AccordionPanel,
  Box,
  Center,
  Checkbox,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { navigate, useLocation } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import SizeSlider from "../../../../dynamicGrid/sizeSlider"
import { getBadgeLabel } from "../../../../imageCard/privates"
import { CardBadge, Ellipsis } from "../../../../imageCard/styles"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice, mediaFilteredSelector, mediaGroupedByFilters } from "../../../../reducers"
import { ControlStatus, QualityStatus } from "../../../../types"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DisabledCheck,
  DisplayAccordion,
  DisplayCheckboxGroup,
  FiltersAccordion,
  LeftBarLabel,
  LeftBarLabelTitle,
  SeparatorBox,
  SideBarBox,
} from "../styles"
import { LeftBarShortcuts } from "../types"
import {
  getStatusFilters,
  isAllQualityFilterChecked,
  isControlFilterActive,
  isStatusFilterActive,
  toggleAllQualityFilters,
  toggleControlFilter,
  toggleOffControlFilters,
  toggleStatusFilter,
} from "./privates"

const FilterItem = ({ itemsByFilterData, item }: any) => (
  <Box
    style={{
      width: "140px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <AppToolTip tooltip={item}>
      <CardBadge size={225} badge={item}>
        <Ellipsis size={225}> {getBadgeLabel(item)} </Ellipsis>
      </CardBadge>
    </AppToolTip>

    <CardBadge size={190}>
      <Text children={itemsByFilterData[item]?.length} />
    </CardBadge>
  </Box>
)

const MediaDisplayLeftBar = ({ forceUpdate }: any) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const { search } = useLocation()

  const { transparency, contentSize, cellMatrix, cardHeader, badges, selectMediaIds } = getState(prop("mediaDisplay"))

  const state = getState(identity)
  const itemsByFilterData = getState(mediaGroupedByFilters)

  const allCheckedDisplay = all(identity, [cardHeader, badges, transparency])
  const isIndeterminateDisplay = any(identity, [cardHeader, badges, transparency]) && !allCheckedDisplay
  const allCheckedQualityFilters = isAllQualityFilterChecked(search)
  const isIndeterminateQualityFilters = !isEmpty(getStatusFilters(search)) && !allCheckedQualityFilters
  const controlIsIndeterminate =
    isControlFilterActive(search, ControlStatus.Validated) || isControlFilterActive(search, ControlStatus.Pending)

  const toggleCardHeader = () => dispatch(actions.updateMediaDisplay({ cardHeader: !cardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateMediaDisplay({ badges: !badges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(actions.updateMediaDisplay({ cardHeader: checked, badges: checked, transparency: checked }))
  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaDisplay({ contentSize: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))

  const updateFilter = (setNewSearch: (search: string) => string) => {
    const newSearch = setNewSearch(search)
    const filteredMedia = mediaFilteredSelector(state, newSearch)
    const filteredMediaIds = filteredMedia.map(prop("id"))

    dispatch(
      actions.updateMediaDisplay({ selectMediaIds: intersection(filteredMediaIds, selectMediaIds), scrollRatio: 0 }),
    )

    const searchToken = isEmpty(newSearch) ? "" : "?"

    navigate(`medias${searchToken}${newSearch}`)
  }

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
        <DisplayAccordion borderWidth={0}>
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
                  isChecked={allCheckedDisplay}
                  isIndeterminate={isIndeterminateDisplay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleDisplayOptions(e.target.checked)}
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
        </DisplayAccordion>

        <FiltersAccordion borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle flex="1" textAlign="left" children={"Filters"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack spacing={4}>
              <DisplayCheckboxGroup>
                <Checkbox
                  size={"sm"}
                  isChecked={allCheckedQualityFilters}
                  isIndeterminate={isIndeterminateQualityFilters}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFilter(toggleAllQualityFilters(e.target.checked))
                  }}
                >
                  <LeftBarLabelTitle children={"Quality"} />
                </Checkbox>
                <Stack mt={1} pl={6} spacing={2}>
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.High)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.High))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.High} />}
                  />
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Medium)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Medium))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Medium} />}
                  />
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Low)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Low))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Low} />}
                  />

                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Manual)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Manual))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Manual} />}
                  />
                </Stack>
              </DisplayCheckboxGroup>

              <DisplayCheckboxGroup>
                {controlIsIndeterminate ? (
                  <Checkbox
                    size={"sm"}
                    isChecked={false}
                    isIndeterminate={controlIsIndeterminate}
                    onChange={() => updateFilter(toggleOffControlFilters)}
                  >
                    <LeftBarLabelTitle children={"Control"} />
                  </Checkbox>
                ) : (
                  <HStack mb="11px">
                    <DisabledCheck />
                    <LeftBarLabelTitle children={"Control"} />
                  </HStack>
                )}

                <RadioGroup>
                  <Stack mt={1.5} pl={6} spacing={2}>
                    <Radio
                      isChecked={isControlFilterActive(search, ControlStatus.Pending)}
                      size={"sm"}
                      onChange={() => updateFilter(toggleControlFilter(ControlStatus.Pending))}
                      children={<FilterItem itemsByFilterData={itemsByFilterData} item={ControlStatus.Pending} />}
                    />
                    <Radio
                      isChecked={isControlFilterActive(search, ControlStatus.Validated)}
                      size={"sm"}
                      onChange={() => updateFilter(toggleControlFilter(ControlStatus.Validated))}
                      children={<FilterItem itemsByFilterData={itemsByFilterData} item={ControlStatus.Validated} />}
                    />
                  </Stack>
                </RadioGroup>
              </DisplayCheckboxGroup>
            </Stack>
          </AccordionPanel>
        </FiltersAccordion>
      </Accordion>
    </SideBarBox>
  )
}

export default MediaDisplayLeftBar
