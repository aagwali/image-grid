import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { ColorBadges } from "../../../../../../../types"
import { AccordionItemTitle } from "../../../../../../accordionItem/styles"
import BadgeFilterItem from "../../../../../../badgeFilterItem"
import { isFilterActive, toggleAllFilters, toggleFilter } from "../privates"
import { ColorBadgeFilterProps } from "./types"

const ColorBadgeFilters = ({
  allCheckedColorFilters,
  isIndeterminateColor,
  updateFilter,
  search,
  itemsByFilterData,
}: ColorBadgeFilterProps) => (
  <Stack>
    <Checkbox
      size={"sm"}
      isChecked={allCheckedColorFilters}
      isIndeterminate={isIndeterminateColor}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter(toggleAllFilters("colorBadges", Object.values(ColorBadges), e.target.checked, search))
      }}
    >
      <AccordionItemTitle children={"Colors"} />
    </Checkbox>
    <Stack pl={6} spacing={2} mt={2}>
      <Checkbox
        isChecked={isFilterActive("colorBadges", search, ColorBadges.Grey)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("colorBadges", ColorBadges.Grey, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={ColorBadges.Grey} />}
      />
      <Checkbox
        isChecked={isFilterActive("colorBadges", search, ColorBadges.Red)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("colorBadges", ColorBadges.Red, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={ColorBadges.Red} />}
      />
      <Checkbox
        isChecked={isFilterActive("colorBadges", search, ColorBadges.Green)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("colorBadges", ColorBadges.Green, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={ColorBadges.Green} />}
      />

      <Checkbox
        isChecked={isFilterActive("colorBadges", search, ColorBadges.Blue)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("colorBadges", ColorBadges.Blue, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={ColorBadges.Blue} />}
      />

      <Checkbox
        isChecked={isFilterActive("colorBadges", search, ColorBadges.Yellow)}
        size={"sm"}
        onChange={() => updateFilter(toggleFilter("colorBadges", ColorBadges.Yellow, search))}
        children={<BadgeFilterItem itemsByFilterData={itemsByFilterData} item={ColorBadges.Yellow} />}
      />
    </Stack>
  </Stack>
)

export default ColorBadgeFilters
