import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"

import LightBox from "./components/lightBox"
import ComponentsLayout from "./componentsLayout"

const Application = () => (
  <React.Fragment>
    <ToastContainer />
    <ComponentsLayout />
  </React.Fragment>
)

export default Application
