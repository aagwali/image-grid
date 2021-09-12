import styled, { css } from "styled-components"

import { Box, Center, Text, theme, VStack } from "@chakra-ui/react"

import Spinner from "../../assets/images/spinnerMini.svg"
import Upload from "../../assets/images/upload.svg"

export const UploadBox = styled(VStack)`
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
`

export const DropArea = styled(Center)`
  height: 75px;
  width: 150px;

  border-width: 1px;
  border-radius: 3px;
  border-color: ${theme.colors.gray[300]};
  background-color: ${theme.colors.gray[50]};
  cursor: pointer;
  -webkit-transition: all ease 500ms;
  transition: all ease-in-out 500ms;

  ${({ accept }) => {
    if (accept === "true")
      return css`
        height: 150px;
        width: 150px;
        border-style: dotted;
        border-color: ${theme.colors.teal[200]};
        background-color: #f3fffd;
      `
  }};

  ${({ uploading }) => {
    if (uploading === "true")
      return css`
        pointer-events: none;
        /* height: 150px;
        width: 150px; */
        border-color: ${theme.colors.gray[300]};
        border-width: 2px;
        border-radius: 4px;
        box-shadow: 0.6px 0.6px 4px ${theme.colors.gray[200]};
      `
  }};

  :hover {
    height: 150px;
    border-width: 2px;
    width: 150px;
    border-color: ${theme.colors.teal[200]};
    background-color: #f3fffd;
    border-style: dashed;
  }

  :active {
    border-color: ${theme.colors.teal[400]};
    background-color: ${theme.colors.teal[50]};
    box-shadow: none;
  }
`

export const DropText = styled(Text)`
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.teal[500]};
  user-select: none;

  ${({ uploading }) => {
    if (uploading === "true")
      return css`
        color: ${theme.colors.gray[300]};
      `
  }};
`

export const ProgressText = styled(Text)`
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.teal[500]};
  user-select: none;
`

export const UploadIcon = styled(Box)`
  height: 25px;
  width: 25px;

  ${({ uploading }) => {
    if (uploading === "true")
      return css`
        background: url("${Spinner}") center no-repeat;
      `
    if (uploading === "false")
      return css`
        background: url("${Upload}") center no-repeat;
      `
  }};
`
export const ProgressValue = styled(Text)`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.teal[500]};
  font-weight: ${theme.fontWeights.bold};
`
