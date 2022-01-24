import React from "react"

import { LinkAction } from "../styles"
import ToolTip from "../tooltip"
import { DeselectAllIcon, ToggledHStack } from "./styles"
import { DeselectAllProps } from "./types"

const DeselectAllItem = ({ deselectAll, selectionExists, entity }: DeselectAllProps) => (
  <ToggledHStack enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
    <DeselectAllIcon />
    <ToolTip tooltip="deselectAll">
      <LinkAction children={`Deselect all ${entity}`} />
    </ToolTip>
  </ToggledHStack>
)

export default DeselectAllItem
