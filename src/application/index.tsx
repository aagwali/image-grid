import "react-toastify/dist/ReactToastify.css"

import { prop } from "rambda"
import React from "react"
import { ToastContainer } from "react-toastify"

import { useAppSelector } from "../storeConfig"
import Body from "./components/tree/body"
import Header from "./components/tree/header"
import Error from "./components/tree/root/error"
import MediaLightBox from "./components/tree/root/mediaLightBox"

const getStateProps = () => ({
  authenticated: useAppSelector(prop("authenticated")),
})

const Application = () => {
  const { authenticated } = getStateProps()

  // if (!authenticated) return <React.Fragment />

  return (
    <React.Fragment>
      <Error />
      <MediaLightBox />
      <ToastContainer />
      <Header />
      <Body />
    </React.Fragment>
  )
}

export default Application
