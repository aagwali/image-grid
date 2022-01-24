import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import { HStack } from "@chakra-ui/react"

import LightBoxContainer from "./components/lightBoxContainer"
import MainDisplay from "./mainDisplay"
import NavigationBar from "./navigationBar"

const Application = (_: any) => (
  <React.Fragment>
    <LightBoxContainer />
    <ToastContainer />

    <HStack spacing={0}>
      <NavigationBar />
      <MainDisplay />
    </HStack>
  </React.Fragment>
)

export default Application
