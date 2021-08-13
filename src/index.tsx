import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { ChakraProvider } from "@chakra-ui/react"

import Application from "./application"
import Auth from "./application/components/effect/auth"
import { store } from "./storeConfig"
import { theme } from "./theme"

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <Auth /> */}
        <Application />
      </ChakraProvider>
    </Provider>,
    document.getElementById("app"),
  )

render()
