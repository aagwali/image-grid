import styled, { css } from "styled-components"

import { AccordionButton, Box, Button, Center, HStack, Text, theme } from "@chakra-ui/react"

import CheckerBoardSvg from "../../../../assets/images/checkerboard.svg"
import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const MediaDisplayBox = styled(Box)`
  display: flex;
  flex-direction: row;
`

export const LeftBarBox = styled(Box)`
  flex: 1;
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

export const DisplayCheckboxGroup = styled(Box)`
  margin-left: 24px;
`

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

export const SelectionBox = styled(HStack)`
  margin-bottom: ${theme.space[0.5]};
`

export const SelectButton = styled(Button)`
  font-weight: ${theme.fontWeights.normal};
  font-size: ${theme.fontSizes.md};
  :hover {
    background-color: ${theme.colors.transparent};
    box-shadow: 0.6px 0.6px 4px ${theme.colors.gray[400]};
  }
  :focus {
    box-shadow: none;
  }
  :active {
    -webkit-transform: scale(0.98, 0.98);
    transform: scale(0.98, 0.98);
  }
`

export const NoMediaBox = styled(Center)`
  padding-top: 350px;
`

export const MediaBox = styled(Box)`
  flex: 7;
  border-width: 0.75px;
  border-color: ${theme.colors.teal[600]};
  ${(props) =>
    !props["data-loaded"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`
