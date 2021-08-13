import styled from "styled-components"

import { theme } from "@chakra-ui/react"

export const HeaderHStack = styled.div`
  display: flex;
  text-decoration: underline;
  justify-content: space-between;
  width: ${theme.space["32"]};
  font-size: ${theme.fontSizes["2xl"]};
  color: ${theme.colors.teal[600]};
`
