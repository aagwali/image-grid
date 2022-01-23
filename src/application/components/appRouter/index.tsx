import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { Route, Routes } from "react-router-dom"

import NotFound from "../notFound"

const AppRouter = ({ children }: any) => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {children}
    </Routes>
  )
}

export default AppRouter
