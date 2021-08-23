import styled, { css } from "styled-components"

import { Box, HStack, theme, VStack } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const DynamicGridBox = styled(VStack)``

export const SettingsBox = styled(HStack)``

export const ItemsBox = styled(Box)`
  width: 75%;
  border-width: 0.75px;
  border-color: ${theme.colors.teal[600]};
  ${(props) =>
    !props["data-loaded"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`
