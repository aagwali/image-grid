import "react-toastify/dist/ReactToastify.css"

import React from "react"
import styled from "styled-components"

import { Center } from "@chakra-ui/react"
import { Link } from "@reach/router"

import NotFoundSvg from "../../assets/images/notFound.svg"

export const ImageErrorBox = styled(Center)`
  background: url("${NotFoundSvg}") center no-repeat;
  height: 70vh;
  width: 100%;
`

export const HomeLink = styled(Link)`
  padding-top: 120px;
  text-decoration: underline;
`
