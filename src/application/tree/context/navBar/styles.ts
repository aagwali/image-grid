import styled from "styled-components"

import { HStack, theme } from "@chakra-ui/react"

export const NavBarBox = styled(HStack)`
  padding-left: ${theme.space[5]};
  width: 100%;
  height: 70px;
  font-size: ${theme.fontSizes["xl"]};

  color: ${theme.colors.teal[600]};
`
