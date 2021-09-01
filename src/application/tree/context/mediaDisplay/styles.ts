import styled, { css } from "styled-components"

import { AccordionButton, Box, HStack, Text, theme } from "@chakra-ui/react"

import SelectAll from "../../../../assets/images/selectAll.svg"
import SpinnerSvg from "../../../../assets/images/spinner.svg"
import UnselectAll from "../../../../assets/images/unselectAll.svg"

export const MediaDisplayBox = styled(HStack)``

export const MediaBox = styled(Box)`
  width: 100%;
  border-width: 0.75px;
  border-color: ${theme.colors.teal[600]};
  ${(props) =>
    !props["data-loaded"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`

export const SideBarBox = styled(Box)`
  width: ${theme.space[72]};
`

export const AccordionButtonBox = styled(AccordionButton)`
  height: 40px;
  color: ${theme.colors.teal[800]};

  :focus {
    box-shadow: none;
  }
  :hover {
    background: none;
    color: ${theme.colors.teal[400]};
  }
`

export const AccordionButtonTitle = styled(Text)`
  font-size: 14px;
  font-weight: ${theme.fontWeights.semibold};
`

//#region LEFT BAR

export const LeftBarLabelTitle = styled(Box)`
  font-size: 13px;
  user-select: none;
  font-weight: ${theme.fontWeights.semibold};
`

export const LeftBarLabel = styled(Text)`
  font-size: 13px;
  :hover {
    color: ${theme.colors.teal[400]};
  }
`

export const DisplayCheckboxGroup = styled(Box)`
  margin-left: 24px;
`

//#endregion

//#region RIGHT BAR

export const RightBarActionBox = styled(HStack)`
  ${({ enabled }) => {
    if (enabled === "false")
      return css`
        opacity: 0.4;
        pointer-events: none;
      `
  }};
`

export const RightBarAction = styled(Box)`
  user-select: none;
  cursor: pointer;

  font-size: 13px;
  text-decoration: underline;
  color: ${theme.colors.teal[400]};
  :hover {
    background: none;
    color: ${theme.colors.teal[600]};
  }
`

export const ActionIcon = styled(Box)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const SelectAllIcon = styled(ActionIcon)`
  background: url("${SelectAll}") center no-repeat;
`

export const UnselectAllIcon = styled(ActionIcon)`
  background: url("${UnselectAll}") center no-repeat;
`

//#endregion
