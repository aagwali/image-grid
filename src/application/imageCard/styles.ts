import styled, { css, keyframes } from "styled-components"

import { Box, Center, HStack, Text, theme } from "@chakra-ui/react"

import CheckerBoardSvg from "../../assets/images/checkerboard.svg"
import DocErrorSvg from "../../assets/images/docError.svg"
import SpinnerSvg from "../../assets/images/spinner.svg"
import { QualityStatus } from "../types"

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`

export const PaddingBox = styled(Box)`
  /* padding: ${(1 / 25) * 250}px; */
  position: relative;
  padding: ${({ padding }) => `${padding}px`}; // 5 at 250

  :active {
    -webkit-transform: scale(0.995, 0.995);
    transform: scale(0.995, 0.995);
    box-shadow: none;
  }
`

export const CardBox = styled(Box)`
  border-width: 0.75px;
  border-color: ${theme.colors.teal[600]};
  border-radius: 3px;
  animation: ${fadeIn} 1.5s;

  ${(props) =>
    props["data-loaded"] &&
    props["data-transparency"] &&
    css`
      background: url("${CheckerBoardSvg}") center;
    `};

  ${({ checked }) =>
    checked &&
    css`
      border-color: ${theme.colors.pink[400]};
      border-width: 2px;
      border-radius: 4px;
      box-shadow: 0.6px 0.6px 4px ${theme.colors.pink[200]};
    `};

  :hover {
    ${({ checked }) =>
      !checked &&
      css`
        box-shadow: 0.6px 0.6px 4px ${theme.colors.gray[400]};
      `};

    .enlargeImage {
      opacity: 0.8;
    }
  }
`

export const CardHeaderBox = styled(Center)`
  width: 100%;

  ${({ height }) => css`
    height: ${height}px;
  `};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[300]};
  background: ${theme.colors.gray[50]};
`

export const CardTitle = styled(Text)`
  ${({ size }) => css`
    font-weight: ${theme.fontWeights.semibold};
    font-size: ${Math.floor(size / 17)}px;
    pointer-events: none;
  `};
`

export const CardSubTitle = styled(Text)`
  ${({ size }) => css`
    font-size: ${Math.floor(size / 20)}px;
    pointer-events: none;
  `};
`

export const CardImageBox = styled(Box)`
  position: relative;
`

export const CardImageErrorBox = styled(Box)`
  background: url("${DocErrorSvg}") center no-repeat;
`

export const CardImageLoading = styled(Box)`
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

export const CardBadgesBox = styled(HStack)`
  position: absolute;
  z-index: 5;
  right: 0;
  bottom: 0;
`

export const CardBadge = styled(Center)`
  height: ${({ size }) => `${size / 12}px`};
  font-size: ${({ size }) => `${size / 18}px`};
  font-weight: ${theme.fontWeights.bold};

  border-radius: ${({ size }) => `${(1 / 25) * size}px`};
  text-align: center;
  padding: ${({ size }) => `${(1 / 100) * size}px`};

  border-width: 1px;

  ${({ badge }) => {
    if (badge === QualityStatus.High)
      return css`
        border-color: ${theme.colors.green[300]};
        color: ${theme.colors.green[300]};
      `
    if (badge === QualityStatus.Medium)
      return css`
        border-color: ${theme.colors.orange[300]};
        color: ${theme.colors.orange[300]};
      `
    //else is quality badge
    return css`
      border-color: ${theme.colors.orange[500]};
      color: ${theme.colors.orange[500]};
    `
  }};

  background-color: ${theme.colors.white};
`

export const Ellipsis = styled(Box)`
  margin-bottom: 1.5px;
  padding-right: ${({ size }) => `${(1 / 50) * size}px`};
  padding-left: ${({ size }) => `${(1 / 50) * size}px`};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  pointer-events: none;
`
