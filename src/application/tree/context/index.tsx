import React from "react"

import { Redirect, RouteComponentProps } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import AppRouter from "../../appRouter"
import { getContextByLabel, getMediaByContextLabel } from "../../services"
import NavigationBar from "./contextNavBar"
import MediaDisplay from "./mediaDisplay"
import { ContextHeader } from "./styles"

const Context = ({ contextLabel }: RouteComponentProps & { contextLabel?: string }) => {
  const { isLoading, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()

  if (!contextLabel || isLoading || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

  return (
    <React.Fragment>
      <ContextHeader children={contextLabel} />
      <NavigationBar />
      <AppRouter>
        <Redirect from="/" to="medias" noThrow />
        <MediaDisplay path="medias" />
      </AppRouter>
    </React.Fragment>
  )
}

export default Context
