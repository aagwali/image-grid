import { extendTheme } from "@chakra-ui/react"

const Button = {
  defaultProps: {},
}

export const theme = extendTheme({
  fonts: {
    body: "Raleway",
  },
  components: {
    Button,
  },
})
