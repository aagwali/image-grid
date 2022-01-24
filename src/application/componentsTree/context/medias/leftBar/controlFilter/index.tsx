import React from "react"

import { Checkbox, HStack, Radio, RadioGroup, Stack } from "@chakra-ui/react"

import { FilterItem } from "../"
import { AccordionItemTitle } from "../../../../../components/appAccordionItem/styles"
import { ControlStatus } from "../../../../../types"
import { isControlFilterActive, toggleControlFilter, toggleOffControlFilters } from "../privates"
import { DisabledCheck } from "./styles"
import { ControlFiltersProps } from "./types"

export const ControlFilters = ({
  controlIsIndeterminate,
  search,
  itemsByFilterData,
  updateFilter,
}: ControlFiltersProps) => (
  <Stack>
    {controlIsIndeterminate ? (
      <Checkbox
        size={"sm"}
        isChecked={false}
        isIndeterminate={controlIsIndeterminate}
        onChange={() => updateFilter(toggleOffControlFilters(search))}
      >
        <AccordionItemTitle children={"Control"} />
      </Checkbox>
    ) : (
      <HStack>
        <DisabledCheck />
        <AccordionItemTitle children={"Control"} />
      </HStack>
    )}

    <RadioGroup>
      <Stack pl={6} spacing={2} mt={0}>
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
  </Stack>
)
