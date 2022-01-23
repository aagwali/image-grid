import React from "react"

import AppToolTip from "../../../../../components/appTooltip"
import { RightBarAction, RightBarActionBox, SelectAllIcon } from "../../styles"
import { SelectionAllProps } from "./types"

const SelectAllItem = ({ selectAll }: SelectionAllProps) => (
  <RightBarActionBox spacing={1} onClick={selectAll}>
    <SelectAllIcon />
    <AppToolTip tooltip="selectAll">
      <RightBarAction children={"Select all medias"} />
    </AppToolTip>
  </RightBarActionBox>
)

export default SelectAllItem
