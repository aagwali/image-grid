import styled from "styled-components"

import { Text, theme } from "@chakra-ui/react"

export const TextPlaceholder = styled(Text)`
  color: ${theme.colors.gray[400]};
  margin-top: ${theme.space[20]};
  font-weight: ${theme.fontWeights.bold};
`
