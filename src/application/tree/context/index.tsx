import React from "react"

import { Box } from "@chakra-ui/react"
import { Redirect, RouteComponentProps } from "@reach/router"
import { skipToken } from "@reduxjs/toolkit/dist/query"

import AppRouter from "../../appRouter"
import { getContextByLabel, getMediaByContextLabel } from "../../services"
import NavigationBar from "../navBar"
import { NavigationLeftBox, NavigationRightBox } from "../navBar/styles"
import MediaDisplay from "./mediaDisplay"

const Context = ({ contextLabel }: RouteComponentProps & { contextLabel?: string }) => {
  const { isLoading, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()

  if (!contextLabel || isLoading || error) return <React.Fragment />

  if (useGetMedia.isUninitialized) getMedia(contextLabel)

  return (
    <Box style={{ display: "flex" }}>
      {/* bug when using styled component here */}
      <NavigationLeftBox>
        <NavigationBar />
      </NavigationLeftBox>
      <NavigationRightBox>
        <AppRouter>
          <Redirect from="/" to="medias" noThrow />
          <MediaDisplay path="medias" />
        </AppRouter>
      </NavigationRightBox>
    </Box>
  )
}

export default Context
