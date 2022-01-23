import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { VStack } from "@chakra-ui/react"

import { ErrorNumber, ErrorText, HomeLink } from "./styles"

const NotFound = (_: any) => (
  <VStack h="100vh" justifyContent="center">
    <ErrorText> Page not found </ErrorText>
    <ErrorNumber> 404 </ErrorNumber>
    <HomeLink children="Home" to="../../../../" />
  </VStack>
)

export default NotFound
