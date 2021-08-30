import styled, { css } from "styled-components"

import { Box, theme } from "@chakra-ui/react"

import SpinnerSvg from "../../../../assets/images/spinner.svg"

export const MediaDisplayBox = styled(Box)`
  display: flex;
  flex-direction: row;
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
