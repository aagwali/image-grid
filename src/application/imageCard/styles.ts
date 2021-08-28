import styled, { css, keyframes } from "styled-components"

import { Box, Center, theme } from "@chakra-ui/react"

import CheckerBoardSvg from "../../assets/images/checkerboard.svg"
import DocErrorSvg from "../../assets/images/docError.svg"
import SpinnerSvg from "../../assets/images/spinner.svg"

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`

export const ImageBox = styled(Box)`
  border-width: 0.75px;
  border-color: ${theme.colors.gray[400]};
  border-radius: 3px;
  animation: ${fadeIn} 1.5s;
  position: relative;

  ${(props) =>
    props["data-loaded"] &&
    props["data-transparency"] &&
    css`
      background: url("${CheckerBoardSvg}") center;
    `};

  ${(props) =>
    props["item-checked"] === "true" &&
    css`
      border-color: ${theme.colors.pink[400]};
      border-width: 2px;
      border-radius: 4px;
      box-shadow: 0.6px 0.6px 4px ${theme.colors.pink[200]};
    `};

  :hover {
    ${(props) =>
      props["item-checked"] !== "true" &&
      css`
        box-shadow: 0.6px 0.6px 4px ${theme.colors.gray[400]};
      `};

    .enlargeImage {
      opacity: 0.8;
    }
  }

  :active {
    -webkit-transform: scale(0.995, 0.995);
    transform: scale(0.995, 0.995);
    box-shadow: none;
  }
`

export const ImageErrorBox = styled(ImageBox)`
  background: url("${DocErrorSvg}") center no-repeat;
`

export const ImageBoxLoading = styled(Box)`
  background: url("${SpinnerSvg}") center no-repeat;
`

export const EnlargeBox = styled(Center)<{ size: number }>`
  position: absolute;

  width: ${({ size }) => `${Math.round(size / 8 / 2) * 2}px`};
  height: ${({ size }) => `${Math.round(size / 8 / 2) * 2}px`};
  top: ${({ size }) => `${size / 25}px`};
  right: ${({ size }) => `${size / 25}px`};

  background-color: ${theme.colors.gray[200]};
  border-radius: 3px;
  border-width: ${theme.sizes["0.5"]};
  border-color: ${theme.colors.white};
  cursor: pointer;
  opacity: 0;
  -webkit-transition: opacity ease 500ms;
  transition: opacity ease 500ms;

  img {
    -webkit-transition: all ease 400ms;
    transition: all ease 400ms;
    transform: scale(0.5);
  }

  :hover {
    img {
      transform: scale(0.65);
    }
  }
`
