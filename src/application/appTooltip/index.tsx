import React from "react"
import styled from "styled-components"

import { Tooltip } from "@chakra-ui/react"

import MsLogo from "../../assets/images/msLogo.svg"
import { getQualityBadge } from "./privates"

export const AppTooltipBox = styled(Tooltip)``

const AppToolTip = ({ children, tooltip }: any) => (
  <Tooltip
    color="gray.700"
    bg="gray.200"
    hasArrow
    label={getQualityBadge(tooltip)}
    openDelay={500}
    placement="top-start"
  >
    {children}
  </Tooltip>
)

export default AppToolTip
