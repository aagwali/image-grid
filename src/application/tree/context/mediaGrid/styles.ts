import styled, { css } from "styled-components"

import { Box, Button, Center, HStack, theme, VStack } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const DynamicGridBox = styled(VStack)`
  margin-top: ${theme.space[5]};
`

export const HeaderBox = styled(HStack)`
  margin-bottom: ${theme.space[2]};
`

export const TransparencyBox = styled(HStack)`
  position: absolute;
  left: 12.5%;
`

export const SizeBox = styled(HStack)``

export const SelectionBox = styled(HStack)`
  position: absolute;
  right: 12.5%;
  margin-bottom: ${theme.space[0.5]};
`

export const SelectButton = styled(Button)``

export const MediaBox = styled(Box)`
  width: 75%;
  border-width: 0.75px;
  border-color: ${theme.colors.teal[600]};
  ${(props) =>
    !props["data-loaded"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`

export const NoMediaBox = styled(Center)`
  padding-top: 350px;
`
