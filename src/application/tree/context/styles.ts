import styled from "styled-components"

import { Box, theme } from "@chakra-ui/react"

export const ContextHeader = styled(Box)`
  padding-top: ${theme.space[0.5]};
  padding-left: ${theme.space[3]};
  border-bottom-width: 0.75px;
  height: ${theme.space[10]};

  font-size: ${theme.fontSizes["2xl"]};
  font-weight: ${theme.fontWeights.bold};
`
