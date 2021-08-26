import "@fontsource/raleway/400.css"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { ChakraProvider } from "@chakra-ui/react"

import Application from "./application"
import Authentication from "./application/auth"
import { store } from "./storeConfig"
import { theme } from "./theme"

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Authentication>
          <Application />
        </Authentication>
      </ChakraProvider>
    </Provider>,
    document.getElementById("app"),
  )

render()
