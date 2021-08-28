import styled, { css } from "styled-components"

import { Button, HStack, Text, theme } from "@chakra-ui/react"

export const ToolBarBox = styled(HStack)`
  position: absolute;
  top: 0;
  left: 0;
`

export const SelectedButton = styled(Button)`
  padding: 15px;
  margin: 10px;
  border-width: 2px;
  color: ${theme.colors.gray[400]};
  border-color: ${theme.colors.gray[400]};

  ${(props) =>
    props["item-checked"] === "true" &&
    css`
      color: ${theme.colors.pink[400]};
      border-color: ${theme.colors.pink[400]};
    `};

  :hover {
    ${(props) =>
      props["item-checked"] === "true" &&
      css`
        box-shadow: 0 0 1px 2px ${theme.colors.gray[500]}, 0 1px 1px ${theme.colors.gray[500]}!important;
      `};

    ${(props) =>
      props["item-checked"] !== "true" &&
      css`
        box-shadow: 0 0 1px 2px ${theme.colors.pink[600]}, 0 1px 1px ${theme.colors.pink[600]}!important;
      `};

    background-color: ${theme.colors.transparent};
  }

  :focus {
    box-shadow: none;
  }
`

export const SwitchBox = styled(HStack)`
  margin-right: ${theme.space[2.5]};
`

export const QualityText = styled(Text)`
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[400]};
  border-color: ${theme.colors.gray[400]};
`
