import React from "react"

import { Box } from "@chakra-ui/react"
import { Redirect, RouteComponentProps } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import AppRouter from "../../appRouter"
import { getContextByLabel, getMediaByContextLabel } from "../../services"
import NavigationBar from "../navBar"
import { NavigationLeftBox as NavigationLeft, NavigationRightBox as ContentRight } from "../navBar/styles"
import MediaDisplay from "./mediaDisplay"
import { ContextHeader } from "./styles"

const Context = ({ contextLabel }: RouteComponentProps & { contextLabel?: string }) => {
  const { isLoading, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()

  if (!contextLabel || isLoading || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

  // outer box should be NavigationBarBox => bug css
  return (
    <Box display="flex">
      <NavigationLeft>
        <NavigationBar />
      </NavigationLeft>

      <ContentRight>
        <ContextHeader children={contextLabel} />
        <AppRouter>
          <Redirect from="/" to="medias" noThrow />
          <MediaDisplay path="medias" />
        </AppRouter>
      </ContentRight>
    </Box>
  )
}

export default Context
