import styled from "styled-components"

import { Box, Link, Stack, theme } from "@chakra-ui/react"

import Article from "../../../assets/images/article.svg"
import Associate from "../../../assets/images/associate.svg"
import Home from "../../../assets/images/home.svg"
import Media from "../../../assets/images/media.svg"
import MsLogo from "../../../assets/images/msLogo.svg"
import TrashCan from "../../../assets/images/trashCan.svg"

export const NavBarBox = styled(Stack)`
  height: 100vh;
  background: ${theme.colors.teal[700]};
  padding: 2px;
`

export const NavBarLink = styled(Link)`
  /* width: 40px;
  height: 40px; */
  :hover {
    box-shadow: none;
    border-width: 0px;
  }
  :active {
    box-shadow: none;
    border-width: 0px;
  }
  :focus {
    box-shadow: none;
    border-width: 0px;
  }
`

export const HoverIcon = styled(Box)`
  width: 40px;
  height: 40px;
  :hover {
    border-bottom-width: 2px;
    border-color: ${theme.colors.gray[400]};
  }
`

export const MsLogoIcon = styled(HoverIcon)`
  background: url("${MsLogo}") center no-repeat;
`

export const HomeIcon = styled(HoverIcon)`
  background: url("${Home}") center no-repeat;
`

export const ArticleIcon = styled(HoverIcon)`
  background: url("${Article}") center no-repeat;
`

export const MediaIcon = styled(HoverIcon)`
  background: url("${Media}") center no-repeat;
`

export const AssociateIcon = styled(HoverIcon)`
  background: url("${Associate}") center no-repeat;
`

export const TrashIcon = styled(HoverIcon)`
  background: url("${TrashCan}") center no-repeat;
`
