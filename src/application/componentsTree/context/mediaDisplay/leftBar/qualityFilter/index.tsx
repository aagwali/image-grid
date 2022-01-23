import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { FilterItem } from "../"
import { QualityStatus } from "../../../../../types"
import { DisplayCheckboxGroup, LeftBarLabelTitle } from "../../styles"
import { isStatusFilterActive, toggleAllQualityFilters, toggleStatusFilter } from "../privates"
import { QualityFilterProps } from "./types"

export const QualityFilters = ({
  allCheckedQualityFilters,
  isIndeterminateQualityFilters,
  updateFilter,
  search,
  itemsByFilterData,
}: QualityFilterProps) => (
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
)
