import styled from "styled-components"

import { Center, theme } from "@chakra-ui/react"

export const CenteredTextBox = styled(Center)`
  height: 95vh;
  font-size: ${theme.fontSizes["5xl"]};
  color: ${theme.colors.teal[600]};
`
