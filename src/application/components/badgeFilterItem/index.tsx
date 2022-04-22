import React from "react"

import { Text } from "@chakra-ui/react"

import { getBadgeLabel } from "../imageCard/privates"
import { CardBadge, Ellipsis } from "../imageCard/styles"
import ToolTip from "../tooltip"
import { BadgeItem } from "./styles"

const BadgeFilterItem = ({ itemsByFilterData, item }: any) => (
  <BadgeItem>
    <ToolTip tooltip={item}>
      <CardBadge size={225} badge={item}>
        <Ellipsis size={225}> {getBadgeLabel(item)} </Ellipsis>
      </CardBadge>
    </ToolTip>

    <CardBadge size={200}>
      <Text children={itemsByFilterData[item]?.length ?? 0} />
    </CardBadge>
  </BadgeItem>
)

export default BadgeFilterItem
