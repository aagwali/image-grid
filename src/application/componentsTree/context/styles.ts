import styled from "styled-components"

import { Box, theme } from "@chakra-ui/react"

export const ContextHeader = styled(Box)`
  padding-top: ${theme.space[1]};
  padding-left: ${theme.space[3]};
  height: ${theme.space[12]};

  font-size: ${theme.fontSizes["2xl"]};
  font-weight: ${theme.fontWeights.bold};
`
