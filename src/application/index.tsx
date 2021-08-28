import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import { Redirect, RouteComponentProps } from "@reach/router"

import AppRouter from "./appRouter"
import Context from "./tree/context"
import Home from "./tree/home"
import LightBoxContainer from "./tree/lightBoxContainer"

const Application = (_: RouteComponentProps) => {
  return (
    <React.Fragment>
      <LightBoxContainer />
      <ToastContainer />
      <AppRouter>
        <Redirect from="/" to="home" noThrow />
        <Home path="/home" />
        <Context path="/context/:contextLabel/*" />
      </AppRouter>
    </React.Fragment>
  )
}

export default Application
