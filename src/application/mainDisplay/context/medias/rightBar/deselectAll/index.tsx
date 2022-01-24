import React from "react"

import ToolTip from "../../../../../components/tooltip"
import { LinkAction } from "../../../styles"
import { DeselectAllIcon, ToggledHStack } from "./styles"
import { DeselectAllProps } from "./types"

const DeselectAllItem = ({ deselectAll, selectionExists }: DeselectAllProps) => (
  <ToggledHStack enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
    <DeselectAllIcon />
    <ToolTip tooltip="deselectAll">
      <LinkAction children={"Deselect all medias"} />
    </ToolTip>
  </ToggledHStack>
)

export default DeselectAllItem
