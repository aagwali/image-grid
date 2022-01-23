import React from "react"
import { Navigate, Route, useParams } from "react-router-dom"

import { skipToken } from "@reduxjs/toolkit/dist/query"

import AppRouter from "../../components/appRouter"
import { getContextByLabel, getMediaByContextLabel, getReferencesByContextLabel } from "../../services"
import NavigationBar from "./contextNavBar"
import MediaDisplay from "./mediaDisplay"
import ReferencesDisplay from "./referencesDisplay"
import { ContextHeader } from "./styles"

const Context = ({ params }: any) => {
  const { contextLabel } = params
  const { isFetching, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()
  const [getReferences, useGetReferences] = getReferencesByContextLabel.useLazyQuery()

  if (!contextLabel || isFetching || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

  if (useGetReferences.isUninitialized) getReferences(contextLabel)

  return (
    <React.Fragment>
      <ContextHeader children={contextLabel} />
      <NavigationBar />
      <AppRouter>
        <Route path="/" element={<Navigate to="medias" />} />
        <Route path="medias" element={<MediaDisplay />} />
        <Route path="references" element={<ReferencesDisplay />} />
      </AppRouter>
    </React.Fragment>
  )
}

export default () => <Context params={useParams()} />
