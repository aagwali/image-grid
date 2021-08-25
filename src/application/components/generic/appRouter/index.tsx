import "react-toastify/dist/ReactToastify.css"

import React from "react"

import { RouteComponentProps, Router } from "@reach/router"

const NotFound = (_: RouteComponentProps) => <div children={"Not Found"} />

const AppRouter = ({ children }: any) => {
  return (
    <Router>
      <NotFound default />
      {children}
    </Router>
  )
}

export default AppRouter
