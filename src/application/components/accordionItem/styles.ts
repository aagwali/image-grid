import styled from "styled-components"

import { AccordionButton, Box, Text, theme } from "@chakra-ui/react"

export const AccordionButtonLayout = styled(AccordionButton)`
  height: 40px;
  color: ${theme.colors.teal[800]};

  :focus {
    box-shadow: none;
  }
  :hover {
    background: none;
    color: ${theme.colors.teal[400]};
  }
`

export const AccordionTitle = styled(Text)`
  font-size: 14px;
  font-weight: ${theme.fontWeights.semibold};
`

export const AccordionItemTitle = styled(Box)`
  font-size: 13px;
  user-select: none;
  font-weight: ${theme.fontWeights.semibold};
`

export const AccordionItemSubTitle = styled(Text)`
  font-size: 13px;
  :hover {
    color: ${theme.colors.teal[400]};
  }
`
