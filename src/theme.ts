import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  components: {
    Checkbox: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
  fonts: {
    body: "mulish",
  },
})
