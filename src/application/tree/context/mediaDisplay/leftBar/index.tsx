import { intersection, isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionPanel, Center, HStack, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { navigate, useLocation } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import SizeSlider from "../../../../dynamicGrid/sizeSlider"
import { getControlLabel, getQualityLabel } from "../../../../imageCard/privates"
import { CardBadge, Ellipsis } from "../../../../imageCard/styles"
import { getHotkeys } from "../../../../privates"
import { mediaDisplaySlice, mediaStatusFilterSelector } from "../../../../reducers"
import { ControlStatus, QualityStatus } from "../../../../types"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DisabledCheck,
  DisplayAccordion,
  DisplayCheckboxGroup,
  FilterCheckbox,
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

const MediaDisplayLeftBar = ({ forceUpdate }: any) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice
  const { search } = useLocation()

  const { transparency, contentSize, cellMatrix, cardHeader, badges, selectMediaIds } = getState(prop("mediaDisplay"))

  const state = getState((x) => x)

  const allCheckedDisplay = [cardHeader, badges, transparency].every(Boolean)
  const isIndeterminateDisplay = [cardHeader, badges, transparency].some(Boolean) && !allCheckedDisplay
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

    const filteredMedia = mediaStatusFilterSelector(state, newSearch)
    const filteredMediaIds = filteredMedia.map(prop("id"))
    dispatch(actions.updateMediaDisplay({ selectMediaIds: intersection(filteredMediaIds, selectMediaIds) }))

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
                <FilterCheckbox
                  size={"sm"}
                  isChecked={allCheckedDisplay}
                  isIndeterminate={isIndeterminateDisplay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleDisplayOptions(e.target.checked)}
                >
                  <LeftBarLabelTitle children={"Images information"} />
                </FilterCheckbox>
                <Stack pl={6} spacing={1}>
                  <FilterCheckbox isChecked={cardHeader} size={"sm"} onChange={toggleCardHeader}>
                    <AppToolTip tooltip="filename">
                      <LeftBarLabel children={"Filename"} />
                    </AppToolTip>
                  </FilterCheckbox>
                  <FilterCheckbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
                    <AppToolTip tooltip="badges">
                      <LeftBarLabel children={"Badges"} />
                    </AppToolTip>
                  </FilterCheckbox>
                  <FilterCheckbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
                    <AppToolTip tooltip="transparency">
                      <LeftBarLabel children={"Transparency"} />
                    </AppToolTip>
                  </FilterCheckbox>
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
                <FilterCheckbox
                  size={"sm"}
                  isChecked={allCheckedQualityFilters}
                  isIndeterminate={isIndeterminateQualityFilters}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFilter(toggleAllQualityFilters(e.target.checked))
                  }}
                >
                  <LeftBarLabelTitle children={"Quality"} />
                </FilterCheckbox>
                <Stack mt={1} pl={6} spacing={2}>
                  <FilterCheckbox
                    isChecked={isStatusFilterActive(search, QualityStatus.High)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.High))}
                  >
                    <AppToolTip tooltip={QualityStatus.High}>
                      <CardBadge size={225} badge={QualityStatus.High}>
                        <Ellipsis size={225}> {getQualityLabel(QualityStatus.High)} </Ellipsis>
                      </CardBadge>
                    </AppToolTip>
                  </FilterCheckbox>
                  <FilterCheckbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Medium)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Medium))}
                  >
                    <AppToolTip tooltip={QualityStatus.Medium}>
                      <CardBadge size={225} badge={QualityStatus.Medium}>
                        <Ellipsis size={225}>{getQualityLabel(QualityStatus.Medium)}</Ellipsis>
                      </CardBadge>
                    </AppToolTip>
                  </FilterCheckbox>
                  <FilterCheckbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Low)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Low))}
                  >
                    <AppToolTip tooltip={QualityStatus.Low}>
                      <CardBadge size={225} badge={QualityStatus.Low}>
                        <Ellipsis size={225}>{getQualityLabel(QualityStatus.Low)}</Ellipsis>
                      </CardBadge>
                    </AppToolTip>
                  </FilterCheckbox>
                  <FilterCheckbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Manual)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Manual))}
                  >
                    <AppToolTip tooltip={QualityStatus.Manual}>
                      <CardBadge size={225} badge={QualityStatus.Manual}>
                        <Ellipsis size={225}>{getQualityLabel(QualityStatus.Manual)}</Ellipsis>
                      </CardBadge>
                    </AppToolTip>
                  </FilterCheckbox>
                </Stack>
              </DisplayCheckboxGroup>

              <DisplayCheckboxGroup>
                {controlIsIndeterminate ? (
                  <FilterCheckbox
                    size={"sm"}
                    isChecked={false}
                    isIndeterminate={controlIsIndeterminate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateFilter(toggleOffControlFilters)
                    }}
                  >
                    <LeftBarLabelTitle children={"Control"} />
                  </FilterCheckbox>
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
                    >
                      <AppToolTip tooltip={ControlStatus.Pending}>
                        <CardBadge size={225} badge={ControlStatus.Pending}>
                          <Ellipsis size={225}>{getControlLabel(ControlStatus.Pending)}</Ellipsis>
                        </CardBadge>
                      </AppToolTip>
                    </Radio>
                    <Radio
                      isChecked={isControlFilterActive(search, ControlStatus.Validated)}
                      size={"sm"}
                      onChange={() => updateFilter(toggleControlFilter(ControlStatus.Validated))}
                    >
                      <AppToolTip tooltip={ControlStatus.Validated}>
                        <CardBadge size={225} badge={ControlStatus.Validated}>
                          <Ellipsis size={225}>{getControlLabel(ControlStatus.Validated)}</Ellipsis>
                        </CardBadge>
                      </AppToolTip>
                    </Radio>
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
