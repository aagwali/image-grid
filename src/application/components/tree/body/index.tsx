import { prop } from "rambda"
import React from "react"

import { Redirect, Router } from "@reach/router"

import { useAppSelector as getState } from "../../../../storeConfig"
import { getMediaByContextLabel } from "../../../services"
import NotFound from "../root/notFound"
import Home from "./home"
import MediaGrid from "./mediaGrid"

const Body = () => {
  const context = getState(prop("context"))

  if (context === "none") getMediaByContextLabel.useQuery("TODS6")

  return (
    <Router>
      <Redirect from="/" to="/home" noThrow />
      <Home path="/home" />

      <MediaGrid path="/grid" />

      <NotFound default />
    </Router>
  )
}

export default Body
