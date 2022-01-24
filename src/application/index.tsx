import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import LightBoxContainer from "./components/lightBoxContainer"
import ComponentsLayout from "./componentsLayout"

const Application = () => (
  <React.Fragment>
    <LightBoxContainer />
    <ToastContainer />
    <ComponentsLayout />
  </React.Fragment>
)

export default Application
