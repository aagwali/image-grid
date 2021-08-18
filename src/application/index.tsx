import "react-toastify/dist/ReactToastify.css"

import { prop } from "rambda"
import React from "react"
import { ToastContainer } from "react-toastify"

import { useAppSelector } from "../storeConfig"
import Error from "./components/effect/error"
import Body from "./components/tree/body"
import Header from "./components/tree/header"
import MediaLightBox from "./components/tree/MediaLightBox"
import { ApplicationProps } from "./types"

const getStateProps = (): ApplicationProps => ({
  authenticated: useAppSelector(prop("authenticated")),
})

const Application = () => {
  const { authenticated } = getStateProps()

  // if (!authenticated) return <Box />

  return (
    <React.Fragment>
      <ToastContainer />
      <MediaLightBox />
      <Error />
      <Header />
      <Body />
    </React.Fragment>
  )
}

export default Application
