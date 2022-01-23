import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { Center, Text, theme } from "@chakra-ui/react"

import NotFoundSvg from "../../../assets/images/notFound.svg"

export const ImageErrorBox = styled(Center)`
  background: url("${NotFoundSvg}") center no-repeat;
  border-width: 2px;
  height: 100vh;
  width: 100%;
`

export const ErrorText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.teal[600]};
`

export const ErrorNumber = styled(Text)`
  font-size: 100px;
  font-weight: bold;
  color: ${theme.colors.teal[600]};
`

export const HomeLink = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.teal[600]};
  text-decoration: underline;
  :hover {
    color: ${theme.colors.teal[400]};
  }
  :active {
    font-size: 30px;
  }
`
