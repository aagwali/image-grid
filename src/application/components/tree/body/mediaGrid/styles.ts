import styled, { css } from "styled-components"

import { Box, HStack, theme, VStack } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const ItemsBox = styled(Box)`
  border-width: ${theme.sizes["0.5"]};
  border-color: ${theme.colors.teal[600]};
  width: 75%;
  ${(props) =>
    props["data-fetching"] &&
    css`
      background: url("${SpinnerSvg}") center no-repeat;
    `};
`

export const SettingsBox = styled(HStack)``

export const GridBox = styled(VStack)``
