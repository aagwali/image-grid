import styled, { css, keyframes } from "styled-components"

import { Box, theme } from "@chakra-ui/react"

import CheckerBoardSvg from "../../../assets/images/checkerboard.svg"
import DocErrorSvg from "../../../assets/images/docError.svg"
import SpinnerSvg from "../../../assets/images/spinner.svg"

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`

export const ImageBox = styled(Box)`
  border-width: ${theme.space["0.5"]};
  border-color: gray;
  animation: ${fadeIn} 1.5s;

  ${(props) =>
    props["data-loaded"] &&
    props["data-transparency"] &&
    css`
      background: url("${CheckerBoardSvg}") center;
    `};
`

export const ImageBoxError = styled(ImageBox)`
  background: url("${DocErrorSvg}") center no-repeat;
`

export const ImageBoxLoading = styled(Box)`
  background: url("${SpinnerSvg}") center no-repeat;
`
