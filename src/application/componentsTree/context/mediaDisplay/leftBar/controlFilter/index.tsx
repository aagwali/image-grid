import React from "react"

import { Checkbox, HStack, Radio, RadioGroup, Stack } from "@chakra-ui/react"

import { FilterItem } from "../"
import AppToolTip from "../../../../../components/appTooltip"
import { ControlStatus } from "../../../../../types"
import { DisabledCheck, DisplayCheckboxGroup, LeftBarLabelTitle } from "../../styles"
import { isControlFilterActive, toggleControlFilter, toggleOffControlFilters } from "../privates"
import { ControlFiltersProps } from "./types"

export const ControlFilters = ({
  controlIsIndeterminate,
  search,
  itemsByFilterData,
  updateFilter,
}: ControlFiltersProps) => (
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
  </DisplayCheckboxGroup>
)
