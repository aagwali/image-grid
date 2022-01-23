import React from "react"

import AppToolTip from "../../../../../components/appTooltip"
import { DeselectAllIcon, RightBarAction, RightBarActionBox } from "../../styles"
import { DeselectAllProps } from "./types"

const DeselectAllItem = ({ deselectAll, selectionExists }: DeselectAllProps) => (
  <RightBarActionBox enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
    <DeselectAllIcon />
    <AppToolTip tooltip="deselectAll">
      <RightBarAction children={"Deselect all medias"} />
    </AppToolTip>
  </RightBarActionBox>
)

export default DeselectAllItem
