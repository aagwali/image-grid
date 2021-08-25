import "react-toastify/dist/ReactToastify.css"

import React from "react"
import styled from "styled-components"

import { Center } from "@chakra-ui/react"
import { Link, RouteComponentProps, Router } from "@reach/router"

import NotFoundSvg from "../../../assets/images/notFound.svg"

export const ImageBoxError = styled(Center)`
  background: url("${NotFoundSvg}") center no-repeat;
  height: 70vh;
  width: 100%;
`

export const BoxLink = styled(Link)`
  padding-top: 35px;
  text-decoration: underline;
`

const NotFound = (_: RouteComponentProps) => (
  <ImageBoxError>
    <BoxLink children="Home" to="../../../../" />
  </ImageBoxError>
)

const AppRouter = ({ children }: any) => {
  return (
    <Router>
      <NotFound default />
      {children}
    </Router>
  )
}

export default AppRouter
