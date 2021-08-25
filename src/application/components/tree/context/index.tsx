import React from "react"

import { Redirect, RouteComponentProps } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import { getContextByLabel, getMediaByContextLabel } from "../../../services"
import AppRouter from "../../generic/appRouter"
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
      <AppRouter>
        <Redirect from="/" to="medias" noThrow />
        <MediaGrid path="medias" />
      </AppRouter>
    </React.Fragment>
  )
}

export default Context
