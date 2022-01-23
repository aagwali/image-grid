import React from "react"
import { Navigate, Route, useParams } from "react-router-dom"

import AppRouter from "../../components/appRouter"
import NavigationBar from "./contextNavBar"
import MediaDisplay from "./mediaDisplay"
import { getContainerProps } from "./privates"
import ReferencesDisplay from "./referencesDisplay"
import { ContextHeader } from "./styles"

const Context = ({ routeParams }: any) => {
  const { contextLabel, isFetching, error, getMedia, useGetMedia, getReferences, useGetReferences } =
    getContainerProps(routeParams)

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

export default () => <Context routeParams={useParams()} />
