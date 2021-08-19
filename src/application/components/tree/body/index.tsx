import React from "react"

import { Redirect, Router } from "@reach/router"

import NotFound from "../root/notFound"
import Home from "./home"
import MediaGrid from "./mediaGrid"

const Body = () => {
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
