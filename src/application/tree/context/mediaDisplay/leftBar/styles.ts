import styled from "styled-components"

import { AccordionButton, Box, Text, theme } from "@chakra-ui/react"

export const LeftBarBox = styled(Box)`
  flex: 1;
`

export const AccordionButtonBox = styled(AccordionButton)`
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

export const AccordionButtonTitle = styled(Text)`
  font-size: 14px;
  font-weight: ${theme.fontWeights.semibold};
`

export const DisplayCheckboxGroup = styled(Box)`
  margin-left: 24px;
`

export const LeftBarLabelTitle = styled(Box)`
  font-size: 13px;
  user-select: none;
  font-weight: ${theme.fontWeights.semibold};
`

export const LeftBarLabel = styled(Text)`
  font-size: 13px;
  :hover {
    color: ${theme.colors.teal[400]};
  }
`
