import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { HStack } from "@chakra-ui/react"

import MainDisplay from "./mainDisplay"
import NavigationBar from "./navigationBar"

const ComponentsLayout = () => (
  <HStack spacing={0}>
    <NavigationBar />
    <MainDisplay />
  </HStack>
)

export default ComponentsLayout
