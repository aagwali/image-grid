import React from "react"
import { Navigate, Route } from "react-router-dom"

import { Box } from "@chakra-ui/react"

import Router from "../../components/router"
import Context from "./context"
import Home from "./home"

const MainDisplay = () => (
  <Box w="100vw">
    <Router>
      <Route path="/home" element={<Home />} />
      <Route path="/context/:contextLabel/*" element={<Context />} />
      <Route path="/" element={<Navigate to="home" />} />
    </Router>
  </Box>
)

export default MainDisplay
