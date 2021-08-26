import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { RouteComponentProps } from "@reach/router"

import { BoxLink, ImageBoxError } from "./styles"

const NotFound = (_: RouteComponentProps) => (
  <ImageBoxError>
    <BoxLink children="Home" to="../../../../" />
  </ImageBoxError>
)

export default NotFound
