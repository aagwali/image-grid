import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { QualityStatus } from "../../../../../../../types"
import { AccordionItemTitle } from "../../../../../../accordionItem/styles"
import BadgeFilterItem from "../../../../../../badgeFilterItem"
import { isFilterActive, toggleAllFilters, toggleFilter } from "../privates"
import { QualityFilterProps } from "./types"

export const QualityFilters = ({
  allCheckedQualityFilters,
  isIndeterminateQualityFilters,
  updateFilter,
  search,
  itemsByFilterData,
}: QualityFilterProps) => (
  <Stack>
    <Checkbox
      size={"sm"}
      isChecked={allCheckedQualityFilters}
      isIndeterminate={isIndeterminateQualityFilters}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter(toggleAllFilters("status", Object.values(QualityStatus), e.target.checked, search))
      }}
    >
      <AccordionItemTitle children={"Quality"} />
    </Checkbox>
    <Stack pl={6} spacing={2} mt={2}>
      <Checkbox
        isChecked={isFilterActive("status", search, QualityStatus.High)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("status", QualityStatus.High, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.High} />}
      />
      <Checkbox
        isChecked={isFilterActive("status", search, QualityStatus.Medium)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("status", QualityStatus.Medium, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Medium} />}
      />
      <Checkbox
        isChecked={isFilterActive("status", search, QualityStatus.Low)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("status", QualityStatus.Low, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Low} />}
      />

      <Checkbox
        isChecked={isFilterActive("status", search, QualityStatus.Manual)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("status", QualityStatus.Manual, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Manual} />}
      />
    </Stack>
  </Stack>
)
