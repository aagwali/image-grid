import styled, { css } from "styled-components"

import { Box, HStack, theme } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

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
