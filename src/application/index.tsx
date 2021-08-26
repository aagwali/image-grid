import "react-toastify/dist/ReactToastify.css"

import { prop } from "rambda"
import React from "react"
import { ToastContainer } from "react-toastify"

import { Redirect, RouteComponentProps } from "@reach/router"

import { useAppSelector as getState } from "../storeConfig"
import AppRouter from "./appRouter"
import Context from "./tree/context"
import Home from "./tree/home"
import LightBoxContainer from "./tree/mediaLightBox"

const Application = (_: RouteComponentProps) => {
  const authenticated = getState(prop("authenticated"))

  // if (!authenticated) return <React.Fragment />

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
