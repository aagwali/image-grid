import "@fontsource/mulish/300.css"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import Application from "./application"
import Authentication from "./application/components/auth"
import NavigateSetter from "./application/components/navigateSetter"
import { store } from "./storeConfig"
import { theme } from "./theme"

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Authentication>
          <BrowserRouter>
            <NavigateSetter />
            <Application />
          </BrowserRouter>
        </Authentication>
      </ChakraProvider>
    </Provider>,
    document.getElementById("app"),
  )

render()
