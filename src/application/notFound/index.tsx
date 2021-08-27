import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { RouteComponentProps } from "@reach/router"

import { HomeLink, ImageErrorBox } from "./styles"

const NotFound = (_: RouteComponentProps) => (
  <ImageErrorBox>
    <HomeLink children="Home" to="../../../../" />
  </ImageErrorBox>
)

export default NotFound
