import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import ComponentsLayout from "./components/_layout"
import LightBox from "./components/lightBox"

const Application = () => (
  <React.Fragment>
    <ToastContainer />
    <ComponentsLayout />
  </React.Fragment>
)

export default Application
