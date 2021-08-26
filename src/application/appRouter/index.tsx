import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { Router } from "@reach/router"

import NotFound from "../notFound"

const AppRouter = ({ children }: any) => {
  return (
    <Router>
      <NotFound default />
      {children}
    </Router>
  )
}

export default AppRouter
