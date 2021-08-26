import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { RouteComponentProps, Router } from "@reach/router"

import { BoxLink, ImageBoxError } from "./styles"

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
