import styled from "styled-components"

import { Box, theme } from "@chakra-ui/react"

export const ActionIcon = styled(Box)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const LinkAction = styled(Box)`
  user-select: none;
  cursor: pointer;

  font-size: 13px;
  text-decoration: underline;
  color: ${theme.colors.teal[400]};
  :hover {
    background: none;
    color: ${theme.colors.teal[600]};
  }
`
