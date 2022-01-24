import React from "react"

import AppToolTip from "../../../../../components/appTooltip"
import { LinkAction } from "../../../styles"
import { DeselectAllIcon, ToggledHStack } from "./styles"
import { DeselectAllProps } from "./types"

const DeselectAllItem = ({ deselectAll, selectionExists }: DeselectAllProps) => (
  <ToggledHStack enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
    <DeselectAllIcon />
    <AppToolTip tooltip="deselectAll">
      <LinkAction children={"Deselect all medias"} />
    </AppToolTip>
  </ToggledHStack>
)

export default DeselectAllItem
