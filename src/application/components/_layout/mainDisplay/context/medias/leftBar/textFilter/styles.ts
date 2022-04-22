import styled from "styled-components"

import { Box, Input, theme } from "@chakra-ui/react"

import Cross from "../../../../../../../../assets/images/cross.svg"

export const CloseIcon = styled(Box)`
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  background: url("${Cross}") center no-repeat;
`

export const SearchInput = styled(Input)`
  border-width: 0px 0px 1px 0px;
  padding: 0px;
  margin-left: ${theme.space[6]};
  margin-right: ${theme.space[7]};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.teal[400]};

  :hover {
    border-color: ${theme.colors.teal[400]};
    border-width: 0px 0px 1px 0px;
    box-shadow: none;
  }
  :focus {
    border-color: ${theme.colors.teal[200]};
    border-width: 0px 0px 1px 0px;
    box-shadow: none;
  }
`
