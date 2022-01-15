import debounce from "debounce"
import { all, any, identity, isEmpty, prop } from "rambda"
import React, { useState } from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionPanel, Box, Checkbox, Stack, Text } from "@chakra-ui/react"
import { useLocation } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../appTooltip"
import SizeSlider from "../../../../dynamicGrid/sizeSlider"
import { getBadgeLabel } from "../../../../imageCard/privates"
import { CardBadge, Ellipsis } from "../../../../imageCard/styles"
import { getHotkeys } from "../../../../privates"
import { mediaByFilterSelector, referencesDisplaySlice } from "../../../../reducers"
import { ControlStatus } from "../../../../types"
import {
  AccordionButtonBox,
  DisplayAccordion,
  DisplayCheckboxGroup,
  FiltersAccordion,
  LeftBarLabel,
  LeftBarLabelTitle,
  ReferenceDisplayTitle,
  SeparatorBox,
  SideBarBox,
} from "../styles"
import { LeftBarShortcuts } from "../types"
import { getStatusFilters, isAllQualityFilterChecked, isControlFilterActive } from "./privates"

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

    <CardBadge size={200}>
      <Text children={itemsByFilterData[item]?.length ?? 0} />
    </CardBadge>
  </Box>
)

const ReferenceDisplayLeftBar = () => {
  const dispatch = useAppDispatch()
  const { actions } = referencesDisplaySlice
  const { search } = useLocation()

  const { mediaTransparency, contentSize, mediaCardHeader, mediaBadges, selectedReferenceIds, mediaWhiteReplacement } =
    getState(prop("referencesDisplay"))

  const itemsByFilterData = getState(mediaByFilterSelector)

  const allCheckedDisplay = all(identity, [mediaCardHeader, mediaBadges, mediaTransparency, mediaWhiteReplacement])
  const isIndeterminateDisplay =
    any(identity, [mediaCardHeader, mediaBadges, mediaTransparency, mediaWhiteReplacement]) && !allCheckedDisplay
  const allCheckedQualityFilters = isAllQualityFilterChecked(search)
  const isIndeterminateQualityFilters = !isEmpty(getStatusFilters(search)) && !allCheckedQualityFilters
  const controlIsIndeterminate =
    isControlFilterActive(search, ControlStatus.Validated) || isControlFilterActive(search, ControlStatus.Pending)

  const toggleCardHeader = () => dispatch(actions.updateReferencesDisplay({ mediaCardHeader: !mediaCardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateReferencesDisplay({ mediaBadges: !mediaBadges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(
      actions.updateReferencesDisplay({
        mediaCardHeader: checked,
        mediaBadges: checked,
        mediaTransparency: checked,
        mediaWhiteReplacement: checked,
      }),
    )
  const toggleTransparency = () => dispatch(actions.updateReferencesDisplay({ mediaTransparency: !mediaTransparency }))
  const toggleWhiteClipping = () =>
    dispatch(actions.updateReferencesDisplay({ mediaWhiteReplacement: !mediaWhiteReplacement }))

  // Convert with select ref filter
  // const updateFilterSideEffects = (newSearch: string, filteredMediaIds: string[]) =>
  //   dispatch(
  //     actions.updateReferencesDisplay({
  //       selectedMediaIds: intersection(filteredMediaIds, selectedMediaIds),
  //       scrollRatio: 0,
  //       lastFilter: newSearch,
  //     }),
  //   )
  // const updateFilter = updateFilter_(getState(identity), updateFilterSideEffects)

  const [inputSearch, setInputSearch] = useState("")

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === LeftBarShortcuts.Transparency) toggleTransparency()
    if (hotkey === LeftBarShortcuts.Clipping) toggleWhiteClipping()
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
            <ReferenceDisplayTitle flex="1" textAlign="left" children={"Display options"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack spacing={8}>
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
                  <Checkbox isChecked={mediaCardHeader} size={"sm"} onChange={toggleCardHeader}>
                    <AppToolTip tooltip="filename">
                      <LeftBarLabel children={"Media info"} />
                    </AppToolTip>
                  </Checkbox>
                  <Checkbox isChecked={mediaBadges} size={"sm"} onChange={toggleCardBadges}>
                    <AppToolTip tooltip="badges">
                      <LeftBarLabel children={"Badges"} />
                    </AppToolTip>
                  </Checkbox>
                  <Checkbox isChecked={mediaTransparency} size={"sm"} onChange={toggleTransparency}>
                    <AppToolTip tooltip="transparency">
                      <LeftBarLabel children={"Transparency"} />
                    </AppToolTip>
                  </Checkbox>
                  <Checkbox isChecked={mediaWhiteReplacement} size={"sm"} onChange={toggleWhiteClipping}>
                    <AppToolTip tooltip="clipping">
                      <LeftBarLabel children={"White clipping"} />
                    </AppToolTip>
                  </Checkbox>
                </Stack>
              </DisplayCheckboxGroup>
            </Stack>
          </AccordionPanel>
        </DisplayAccordion>

        <FiltersAccordion>
          <AccordionButtonBox>
            <AccordionIcon />
            <ReferenceDisplayTitle flex="1" textAlign="left" children={"Filters"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack spacing={4}>
              {/* <HStack spacing={0} style={{ position: "relative" }}>
                <InputGroup>
                  <SearchInput
                    autoFocus={true}
                    size={"xs"}
                    placeholder="Filter on media name"
                    value={inputSearch}
                    onChange={(e: any) => {
                      setInputSearch(e.target.value)
                      debounce(() => {
                        updateFilter(setTextFilter(e.target.value, search))
                      }, 500)()
                    }}
                  />
                </InputGroup>
                <CloseIcon
                  onClick={() => {
                    updateFilter(toggleOffTextFilters(search))
                    setInputSearch("")
                  }}
                />
              </HStack>
              <DisplayCheckboxGroup>
                <Checkbox
                  size={"sm"}
                  isChecked={allCheckedQualityFilters}
                  isIndeterminate={isIndeterminateQualityFilters}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFilter(toggleAllQualityFilters(e.target.checked, search))
                  }}
                >
                  <LeftBarLabelTitle children={"Quality"} />
                </Checkbox>
                <Stack mt={1} pl={6} spacing={2}>
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.High)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.High, search))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.High} />}
                  />
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Medium)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Medium, search))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Medium} />}
                  />
                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Low)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Low, search))}
                    children={<FilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Low} />}
                  />

                  <Checkbox
                    isChecked={isStatusFilterActive(search, QualityStatus.Manual)}
                    size={"sm"}
                    onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Manual, search))}
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
                    onChange={() => updateFilter(toggleOffControlFilters(search))}
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
                      onChange={() => updateFilter(toggleControlFilter(ControlStatus.Pending, search))}
                      children={<FilterItem itemsByFilterData={itemsByFilterData} item={ControlStatus.Pending} />}
                    />
                    <Radio
                      isChecked={isControlFilterActive(search, ControlStatus.Validated)}
                      size={"sm"}
                      onChange={() => updateFilter(toggleControlFilter(ControlStatus.Validated, search))}
                      children={<FilterItem itemsByFilterData={itemsByFilterData} item={ControlStatus.Validated} />}
                    />
                  </Stack>
                </RadioGroup>
              </DisplayCheckboxGroup> */}
            </Stack>
          </AccordionPanel>
        </FiltersAccordion>
      </Accordion>
    </SideBarBox>
  )
}

export default ReferenceDisplayLeftBar
