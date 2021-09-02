import styled, { css } from "styled-components"

import { AccordionButton, Box, HStack, Text, theme } from "@chakra-ui/react"

import DeselectAll from "../../../../assets/images/deselectAll.svg"
import MsLogoBack from "../../../../assets/images/msLogoBackground.svg"
import SelectAll from "../../../../assets/images/selectAll.svg"
import SpinnerSvg from "../../../../assets/images/spinner.svg"

//#region MEDIA

export const MediaBox = styled(Box)`
  width: 100%;
  background: #fafafa;
`

export const LogoBox = styled(Box)`
  border-width: 1px;
  border-color: ${theme.colors.gray[300]};
  background: url("${MsLogoBack}") center no-repeat;

  ${(props) =>
    !props["data-loaded"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`

export const SideBarBox = styled(Box)`
  width: ${theme.space[72]};
`

//#endregion

//#region SIDE BAR COMMON

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
//#endregion

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

export const DeselectAllIcon = styled(ActionIcon)`
  background: url("${DeselectAll}") center no-repeat;
`

//#endregion
