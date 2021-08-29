import styled, { css, keyframes } from "styled-components"

import { Box, Center, Text, theme } from "@chakra-ui/react"

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

export const CardBox = styled(Box)`
  border-width: 0.75px;
  border-color: ${theme.colors.gray[400]};
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

  :active {
    -webkit-transform: scale(0.995, 0.995);
    transform: scale(0.995, 0.995);
    box-shadow: none;
  }
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
    user-select: none;
  `};
`

export const CardSubTitle = styled(Text)`
  ${({ size }) => css`
    font-size: ${Math.floor(size / 20)}px;
    user-select: none;
  `};
`

export const CardBadge = styled(Box)`
  position: absolute;
  z-index: 5;
  right: 0;
  bottom: 0;

  height: ${({ size }) => `${Math.floor(size / 10.8)}px`};
  font-size: ${({ size }) => `${Math.floor(size / 19.2)}px`};

  margin-bottom: ${({ size }) => `${Math.floor(size / 22.7)}px`}; // 11
  margin-left: ${({ size }) => `${Math.floor(size / 16.6)}px`};

  border-radius: 10px;
  text-align: center;
  padding: 2px;

  color: #001111;
  background-color: #55bbff;
`

export const Ellipsis = styled.span`
  padding: 0px 5px 0px 5px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
{
  /* <CardBadge status={"statusTest"} size={imageSize}>
          <Ellipsis>Sizeasdad</Ellipsis>
        </CardBadge> */
}
