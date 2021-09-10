import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  components: {
    Checkbox: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Radio: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Input: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Slider: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Progress: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
  fonts: {
    body: "mulish",
  },
})
