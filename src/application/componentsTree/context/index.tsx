import React from "react"
import { Navigate, Route, useParams } from "react-router-dom"

import AppRouter from "../../components/appRouter"
import { Header } from "./header"
import MediaDisplay from "./medias"
import NavigationTabs from "./navigationTabs"
import { getContainerProps } from "./privates"
import ReferencesDisplay from "./references"

const Context = ({ routeParams }: any) => {
  const { contextLabel, isFetching, error, getMedia, useGetMedia, getReferences, useGetReferences } =
    getContainerProps(routeParams)

  if (!contextLabel || isFetching || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

  if (useGetReferences.isUninitialized) getReferences(contextLabel)

  return (
    <React.Fragment>
      <Header contextLabel={contextLabel} />
      <NavigationTabs />
      <AppRouter>
        <Route path="/" element={<Navigate to="medias" />} />
        <Route path="medias" element={<MediaDisplay />} />
        <Route path="references" element={<ReferencesDisplay />} />
      </AppRouter>
    </React.Fragment>
  )
}

export default () => <Context routeParams={useParams()} />
