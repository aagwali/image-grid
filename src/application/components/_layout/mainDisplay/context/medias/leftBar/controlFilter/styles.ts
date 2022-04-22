import styled from "styled-components"

import { Box, theme } from "@chakra-ui/react"

export const DisabledCheck = styled(Box)`
  width: 12px;
  height: 12px;
  border-width: 2px;
  border-color: ${theme.colors.gray[200]};
  border-radius: 2px;
  background: ${theme.colors.gray[100]};
`
