import React from "react"

import { HStack } from "@chakra-ui/react"

import ToolTip from "../../../../../components/tooltip"
import { LinkAction } from "../../../styles"
import { SelectAllIcon } from "./styles"
import { SelectionAllProps } from "./types"

const SelectAllItem = ({ selectAll }: SelectionAllProps) => (
  <HStack spacing={1} onClick={selectAll}>
    <SelectAllIcon />
    <ToolTip tooltip="selectAll">
      <LinkAction children={"Select all medias"} />
    </ToolTip>
  </HStack>
)

export default SelectAllItem
