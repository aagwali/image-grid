import "react-toastify/dist/ReactToastify.css"

import { prop } from "rambda"
import React from "react"
import { ToastContainer } from "react-toastify"

import { RouteComponentProps, Router } from "@reach/router"

import { useAppSelector as getState } from "../storeConfig"
import Context from "./components/tree/context"
import Home from "./components/tree/home"
import Error from "./components/tree/root/error"
import MediaLightBox from "./components/tree/root/mediaLightBox"

const Application = (_: RouteComponentProps) => {
  const authenticated = getState(prop("authenticated"))

  // if (!authenticated) return <React.Fragment />

  return (
    <React.Fragment>
      <MediaLightBox />
      <Error />
      <ToastContainer />
      <Router>
        <Home path="/" />
        <Context path=":context/*" />
      </Router>
    </React.Fragment>
  )
}

export default Application
