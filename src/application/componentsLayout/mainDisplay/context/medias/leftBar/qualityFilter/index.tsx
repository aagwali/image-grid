import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { AccordionItemTitle } from "../../../../../../components/accordionItem/styles"
import BadgeFilterItem from "../../../../../../components/badgeFilterItem"
import { QualityStatus } from "../../../../../../types"
import { isStatusFilterActive, toggleAllQualityFilters, toggleStatusFilter } from "../privates"
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
        updateFilter(toggleAllQualityFilters(e.target.checked, search))
      }}
    >
      <AccordionItemTitle children={"Quality"} />
    </Checkbox>
    <Stack pl={6} spacing={2} mt={2}>
      <Checkbox
        isChecked={isStatusFilterActive(search, QualityStatus.High)}
        size={"sm"}
        onChange={() => updateFilter(toggleStatusFilter(QualityStatus.High, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.High} />}
      />
      <Checkbox
        isChecked={isStatusFilterActive(search, QualityStatus.Media)}
        size={"sm"}
        onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Media, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Media} />}
      />
      <Checkbox
        isChecked={isStatusFilterActive(search, QualityStatus.Low)}
        size={"sm"}
        onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Low, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Low} />}
      />

      <Checkbox
        isChecked={isStatusFilterActive(search, QualityStatus.Manual)}
        size={"sm"}
        onChange={() => updateFilter(toggleStatusFilter(QualityStatus.Manual, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={QualityStatus.Manual} />}
      />
    </Stack>
  </Stack>
)
