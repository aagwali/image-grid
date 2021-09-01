import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import { Box, HStack } from "@chakra-ui/react"
import { Redirect, RouteComponentProps } from "@reach/router"

import AppRouter from "./appRouter"
import Context from "./tree/context"
import Home from "./tree/home"
import LightBoxContainer from "./tree/lightBoxContainer"
import NavigationBar from "./tree/navBar"

const Application = (_: RouteComponentProps) => (
  <React.Fragment>
    <LightBoxContainer />
    <ToastContainer />

    <HStack spacing={0}>
      <NavigationBar />

      <Box w="100vw">
        <AppRouter>
          <Redirect from="/" to="home" noThrow />
          <Home path="/home" />
          <Context path="/context/:contextLabel/*" />
        </AppRouter>
      </Box>
    </HStack>
  </React.Fragment>
)

export default Application
