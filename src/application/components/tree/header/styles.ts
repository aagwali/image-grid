import styled from "styled-components"

import { Center, theme } from "@chakra-ui/react"

export const HeaderBox = styled(Center)`
  display: flex;
  text-decoration: underline;
  justify-content: space-between;
  width: ${theme.space[36]};
  font-size: ${theme.fontSizes["2xl"]};

  color: ${theme.colors.teal[600]};
`
