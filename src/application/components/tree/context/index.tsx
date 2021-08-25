import React from "react"

import { Redirect, RouteComponentProps, Router } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import { getContextByLabel, getMediaByContextLabel } from "../../../services"
import NotFound from "../root/notFound"
import MediaGrid from "./mediaGrid"
import NavBar from "./navBar"

const Context = ({ contextLabel }: RouteComponentProps & { contextLabel?: string }) => {
  const { isLoading, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()

  if (!contextLabel || isLoading || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

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
