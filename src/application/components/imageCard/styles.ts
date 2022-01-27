import styled, { css, keyframes } from "styled-components"

import { Box, Center, HStack, PopoverContent, Text, theme } from "@chakra-ui/react"

import CheckerBoardSvg from "../../../assets/images/checkerboard.svg"
import DocErrorSvg from "../../../assets/images/docError.svg"
import SpinnerSvg from "../../../assets/images/spinner.svg"
import { ColorBadges, ControlStatus, QualityStatus } from "../../types"

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`

export const PaddingBox = styled(Box)`
  position: relative;
  padding: ${({ padding }) => `${padding}px`};

  :active {
    -webkit-transform: scale(0.995, 0.995);
    transform: scale(0.995, 0.995);
    box-shadow: none;
  }
`

export const CardBox = styled(Box)`
  border-width: 1px;
  border-color: ${theme.colors.gray[400]};
  border-radius: 3px;
  animation: ${fadeIn} 1.5s;
  background: ${theme.colors.white};
  box-shadow: 1.5px 1.5px 1px ${theme.colors.gray[300]};
  user-select: none;

  ${(props) =>
    props["data-loaded"] &&
    props["data-transparency"] &&
    css`
      background: url("${CheckerBoardSvg}") center;
    `};

  ${({ checked }) =>
    checked &&
    css`
      border-color: ${theme.colors.pink[300]};
      border-width: 3px;
      border-radius: 4px;
      box-shadow: 0.6px 0.6px 4px ${theme.colors.pink[200]};
    `};

  :hover {
    ${({ checked }) =>
      !checked &&
      css`
        box-shadow: 0.6px 0.6px 4px ${theme.colors.pink[400]};
      `};

    .enlargeImage {
      opacity: 0.8;
    }
  }

  :active {
    border-color: ${theme.colors.teal[300]};
    box-shadow: none;
    border-width: 2px;
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
  text-overflow: ellipsis;
`

export const ImageTitle = styled(Text)`
  pointer-events: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 1;
  ${(props) => css`
    line-height: ${props.size <= 100 ? 1 : props.size <= 180 ? 1.5 : 2};
  `};
`

export const CardTitle = styled(ImageTitle)`
  font-weight: ${theme.fontWeights.semibold};
  ${(props) => css`
    font-size: ${Math.floor(props["text-size"] / 17)}px;
  `};
`

export const CardSubTitle = styled(ImageTitle)`
  ${(props) => css`
    font-size: ${Math.floor(props["text-size"] / 20)}px;
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

export const EnlargeBox2 = styled(Center)<{ size: number }>`
  position: absolute;

  width: ${({ size }) => `${Math.round(size / 8 / 2) * 2}px`};
  height: ${({ size }) => `${Math.round(size / 8 / 2) * 2}px`};
  top: ${({ size }) => `${size / 25}px`};
  left: ${({ size }) => `${size / 25}px`};

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
export const CardUserBadgesBox = styled(HStack)`
  position: absolute;
  z-index: 5;
  ${(props) => {
    if (props["data-header"]) {
      return css`
        top: ${props["size"] * 0.24}px;
      `
    } else {
      return css`
        top: 0;
      `
    }
  }};
  left: 0;
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
  padding-top: ${({ size }) => `${(1 / 75) * size}px`};

  border-width: 1px;

  background-color: ${theme.colors.white};

  ${({ badge, size }) => {
    if (badge === QualityStatus.High)
      return css`
        border-color: ${theme.colors.green[300]};
        color: ${theme.colors.green[300]};
      `
    if (badge === QualityStatus.Media)
      return css`
        border-color: ${theme.colors.orange[300]};
        color: ${theme.colors.orange[300]};
      `

    if (badge === QualityStatus.Low)
      return css`
        border-color: ${theme.colors.red[500]};
        color: ${theme.colors.red[500]};
      `

    if (badge === QualityStatus.Manual)
      return css`
        border-color: ${theme.colors.purple[400]};
        color: ${theme.colors.purple[400]};
      `

    //control is done
    if (badge === ControlStatus.Validated)
      return css`
        border-color: ${theme.colors.green[300]};
        color: ${theme.colors.green[300]};
      `

    if (badge === ControlStatus.Pending)
      return css`
        border-color: ${theme.colors.gray[400]};
        color: ${theme.colors.gray[400]};
      `

    if (badge === ColorBadges.Grey)
      return css`
        width: ${size / 7}px;
        border-color: ${theme.colors.gray[300]};
        background-color: ${theme.colors.gray[100]};
        :hover {
          border-color: ${theme.colors.teal[300]};
        }
      `

    if (badge === ColorBadges.Red)
      return css`
        width: ${size / 7}px;
        border-color: ${theme.colors.red[200]};
        background-color: ${theme.colors.red[100]};
        :hover {
          border-color: ${theme.colors.teal[300]};
        }
      `
    if (badge === ColorBadges.Green)
      return css`
        width: ${size / 7}px;
        border-color: ${theme.colors.green[200]};
        background-color: ${theme.colors.green[100]};
        :hover {
          border-color: ${theme.colors.teal[300]};
        }
      `

    if (badge === ColorBadges.Blue)
      return css`
        width: ${size / 7}px;
        border-color: ${theme.colors.blue[200]};
        background-color: ${theme.colors.blue[100]};
        :hover {
          border-color: ${theme.colors.teal[300]};
        }
      `
    if (badge === ColorBadges.Yellow)
      return css`
        width: ${size / 7}px;
        border-color: ${theme.colors.yellow[300]};
        background-color: ${theme.colors.yellow[200]};
        :hover {
          border-color: ${theme.colors.teal[300]};
        }
      `

    // gray as undefined
    return css`
      border-color: ${theme.colors.gray[300]};
      color: ${theme.colors.gray[300]};
    `
  }};
`

export const PopoverContent_ = styled(PopoverContent)`
  width: ${({ size }) => `${size * 0.8}px`};
  :focus {
    box-shadow: none;
  }
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
