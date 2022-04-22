import styled, { css } from "styled-components"

import { Box, theme } from "@chakra-ui/react"

import MsLogoBack from "../../../../../../../assets/images/msLogoBackground.svg"
import SpinnerSvg from "../../../../../../../assets/images/spinner.svg"

export const MediaBox = styled(Box)`
  width: 100%;
  background: #fafafa;
  ${({ bin }) => {
    if (bin === "true")
      return css`
        background: ${theme.colors.red[50]};
      `
  }};
`

export const LogoBox = styled(Box)`
  border-width: 1px;
  border-color: ${theme.colors.gray[300]};
  background: url("${SpinnerSvg}") center no-repeat;

  ${({ loaded }) => {
    if (loaded === "true")
      return css`
        background: url("${MsLogoBack}") center no-repeat;
      `
  }};
  ${({ bin }) => {
    if (bin === "true")
      return css`
        border-color: ${theme.colors.red[200]};
      `
  }};
`
