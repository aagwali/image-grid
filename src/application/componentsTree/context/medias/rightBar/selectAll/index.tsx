import React from "react"

import { HStack } from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import { LinkAction } from "../../../styles"
import { SelectAllIcon } from "./styles"
import { SelectionAllProps } from "./types"

const SelectAllItem = ({ selectAll }: SelectionAllProps) => (
  <HStack spacing={1} onClick={selectAll}>
    <SelectAllIcon />
    <AppToolTip tooltip="selectAll">
      <LinkAction children={"Select all medias"} />
    </AppToolTip>
  </HStack>
)

export default SelectAllItem
