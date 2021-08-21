import styled from "styled-components"

import { Box, HStack, theme, VStack } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const ItemsBox = styled(Box)`
  border-width: ${theme.sizes["0.5"]};
  border-color: ${theme.colors.teal[600]};
  width: 75%;
`

export const SettingsBox = styled(HStack)``

export const GridBox = styled(VStack)``
