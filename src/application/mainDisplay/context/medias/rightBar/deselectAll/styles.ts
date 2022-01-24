import styled, { css } from "styled-components"

import { HStack } from "@chakra-ui/react"

import DeselectAll from "../../../../../../assets/images/deselectAll.svg"
import { ActionIcon } from "../../../styles"

export const ToggledHStack = styled(HStack)`
  ${({ enabled }) => {
    if (enabled === "false")
      return css`
        opacity: 0.4;
        pointer-events: none;
      `
  }};
`
export const DeselectAllIcon = styled(ActionIcon)`
  background: url("${DeselectAll}") center no-repeat;
`
