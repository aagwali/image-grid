import { extendTheme } from "@chakra-ui/react"

const Button = {
  defaultProps: {
    size: "xs",
    colorScheme: "red",
  },
}

export const theme = extendTheme({
  fonts: {
    body: "Raleway",
  },
  components: {
    Button,
  },
})
