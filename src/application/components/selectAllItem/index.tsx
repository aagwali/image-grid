import React from "react"

import { HStack } from "@chakra-ui/react"

import { LinkAction } from "../styles"
import ToolTip from "../tooltip"
import { SelectAllIcon } from "./styles"
import { SelectionAllProps } from "./types"

const SelectAllItem = ({ selectAll, entity }: SelectionAllProps) => (
  <HStack spacing={1} onClick={selectAll}>
    <SelectAllIcon />
    <ToolTip tooltip="selectAll">
      <LinkAction children={`Select all ${entity}`} />
    </ToolTip>
  </HStack>
)

export default SelectAllItem
