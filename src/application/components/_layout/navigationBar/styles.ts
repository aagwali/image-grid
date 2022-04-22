import styled from "styled-components"

import { Box, Link, Stack, theme } from "@chakra-ui/react"

import Home from "../../../../assets/images/home.svg"
import MsLogo from "../../../../assets/images/msLogo.svg"

export const NavBarBox = styled(Stack)`
  height: 100vh;
  background: ${theme.colors.teal[700]};
  padding: 2px;
`

export const NavBarLink = styled(Link)`
  :focus {
    box-shadow: none;
  }
`

export const HoverIcon = styled(Box)`
  width: 40px;
  height: 40px;
  :hover {
    border-bottom-width: 2px;
    border-color: ${theme.colors.gray[400]};
  }
  :active {
    border-bottom-width: 0px;
  }
`

export const MsLogoIcon = styled(HoverIcon)`
  background: url("${MsLogo}") center no-repeat;
`

export const HomeIcon = styled(HoverIcon)`
  background: url("${Home}") center no-repeat;
`
