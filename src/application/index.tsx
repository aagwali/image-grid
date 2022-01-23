import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { Box, HStack } from "@chakra-ui/react"

import NavigationBar from "./components/appNavBar"
import AppRouter from "./components/appRouter"
import LightBoxContainer from "./components/lightBoxContainer"
import Context from "./componentsTree/context"
import Home from "./componentsTree/home"

const Application = (_: any) => (
  <React.Fragment>
    <LightBoxContainer />
    <ToastContainer />

    <HStack spacing={0}>
      <NavigationBar />

      <Box w="100vw">
        <AppRouter>
          <Route path="/" element={<Home />} />
          <Route path="/context/:contextLabel/*" element={<Context />} />
        </AppRouter>
      </Box>
    </HStack>
  </React.Fragment>
)

export default Application
