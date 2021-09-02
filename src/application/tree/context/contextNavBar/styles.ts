import styled, { css } from "styled-components"

import { Button, theme } from "@chakra-ui/react"

export const CleanButton = styled(Button)`
  background: none;
  border-radius: 0px;
  :hover {
    background: none;
  }

  :focus {
    box-shadow: none;
  }
`

export const AppLink = styled(CleanButton)`
  height: ${theme.space[12]};
  font-weight: ${theme.fontWeights.bold};
  font-size: 16px;
  border-color: ${theme.colors.teal[500]};
  color: ${theme.colors.teal[800]};

  :hover {
    color: ${theme.colors.teal[400]};
    border-bottom-width: 2px;
    border-color: ${theme.colors.teal[400]};
  }

  :active {
    color: ${theme.colors.teal[200]};
    border-color: ${theme.colors.teal[200]};
  }

  ${({ active }) => {
    if (active === "true")
      return css`
        color: ${theme.colors.teal[400]};
        border-bottom-width: 2px;
        border-color: ${theme.colors.teal[400]};
      `
  }};
`
