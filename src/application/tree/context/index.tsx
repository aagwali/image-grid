import React from "react"

import { Redirect, RouteComponentProps } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import AppRouter from "../../appRouter"
import { getContextByLabel, getMediaByContextLabel, getReferencesByContextLabel } from "../../services"
import Home from "../home"
import NavigationBar from "./contextNavBar"
import MediaDisplay from "./mediaDisplay"
import ReferencesDisplay from "./referencesDisplay"
import { ContextHeader } from "./styles"

const Context = ({ contextLabel }: RouteComponentProps & { contextLabel?: string }) => {
  const { isLoading, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()
  const [getReferences, useGetReferences] = getReferencesByContextLabel.useLazyQuery()

  if (!contextLabel || isLoading || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)
  if (useGetReferences.isUninitialized) getReferences(contextLabel)

  return (
    <React.Fragment>
      <ContextHeader children={contextLabel} />
      <NavigationBar />
      <AppRouter>
        <Redirect from="/" to="medias" noThrow />
        <MediaDisplay path="medias" />
        <ReferencesDisplay path="references" />
      </AppRouter>
    </React.Fragment>
  )
}

export default Context
