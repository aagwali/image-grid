import React from "react"

import { Redirect, RouteComponentProps, Router } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import { getMediaByContextLabel } from "../../../services"
import NotFound from "../root/notFound"
import MediaGrid from "./mediaGrid"
import NavBar from "./navBar"

const Context = ({ context }: RouteComponentProps & { context?: string }) => {
  getMediaByContextLabel.useQuery(context ?? skipToken)

  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Redirect from="/" to="medias" noThrow />
        <MediaGrid path="medias" />
      </Router>
    </React.Fragment>
  )
}

export default Context
