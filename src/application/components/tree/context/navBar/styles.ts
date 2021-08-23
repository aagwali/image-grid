import styled from "styled-components"

import { Center, theme } from "@chakra-ui/react"

export const NavBarBox = styled(Center)`
  display: flex;
  text-decoration: underline;
  justify-content: space-between;
  width: ${theme.space[44]};
  font-size: ${theme.fontSizes["2xl"]};

  color: ${theme.colors.teal[600]};
`
