import "react-toastify/dist/ReactToastify.css"

import { prop } from "rambda"
import React from "react"
import { ToastContainer } from "react-toastify"

import { RouteComponentProps } from "@reach/router"

import { useAppSelector as getState } from "../storeConfig"
import AppRouter from "./components/generic/appRouter"
import Context from "./components/tree/context"
import Home from "./components/tree/home"
import MediaLightBox from "./components/tree/root/mediaLightBox"

const Application = (_: RouteComponentProps) => {
  const authenticated = getState(prop("authenticated"))

  // if (!authenticated) return <React.Fragment />

  return (
    <React.Fragment>
      <MediaLightBox />
      <ToastContainer />
      <AppRouter>
        <Home path="/" />
        <Context path=":contextLabel/*" />
      </AppRouter>
    </React.Fragment>
  )
}

export default Application
