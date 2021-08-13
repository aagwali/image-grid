import { extendTheme } from "@chakra-ui/react"

const Button = {
  defaultProps: {
    size: "xs",
    colorScheme: "red",
  },
}

export const theme = extendTheme({
  components: {
    Button,
  },
})
