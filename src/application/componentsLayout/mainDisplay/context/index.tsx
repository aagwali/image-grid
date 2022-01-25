import React from "react"
import { Navigate, Route, useParams } from "react-router-dom"

import { Stack } from "@chakra-ui/react"

import Router from "../../../components/router"
import { Header } from "./header"
import MediasDisplay from "./medias"
import NavigationTabs from "./navigationTabs"
import { getContainerProps } from "./privates"
import ReferencesDisplay from "./references"

const Context = ({ routeParams: { contextLabel } }: any) => {
  const { getContextIsFetching, getMedias, getMediasHook, getReferences, getReferencesHook } =
    getContainerProps(contextLabel)

  if (getContextIsFetching) return <React.Fragment />

  if (getMediasHook.isUninitialized) getMedias(contextLabel)

  if (getReferencesHook.isUninitialized) getReferences(contextLabel)

  return (
    <Stack spacing={0}>
      <Header contextLabel={contextLabel} />
      <NavigationTabs />
      <Router>
        <Route path="medias" element={<MediasDisplay />} />
        <Route path="references" element={<ReferencesDisplay />} />
        <Route path="/" element={<Navigate to="medias" />} />
      </Router>
    </Stack>
  )
}

export default () => <Context routeParams={useParams()} />
