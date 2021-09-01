import styled from "styled-components"

import { Box, Stack, theme } from "@chakra-ui/react"

import Article from "../../../assets/images/article.svg"
import Associate from "../../../assets/images/associate.svg"
import Home from "../../../assets/images/home.svg"
import Media from "../../../assets/images/media.svg"
import MsLogo from "../../../assets/images/msLogo.svg"
import TrashCan from "../../../assets/images/trashCan.svg"

export const NavigationBarBox = styled(Box)`
  display: flex;
`

export const NavigationLeftBox = styled(Box)`
  flex: 1;
`

export const NavigationRightBox = styled(Box)`
  flex: 38;
`

export const HoverIcon = styled(Box)`
  :hover {
    border-bottom-width: 2px;
    border-color: ${theme.colors.gray[400]};
  }
`

export const NavBarBox = styled(Stack)`
  height: 100vh;
  background: ${theme.colors.teal[700]};
  padding-left: 4px;

  :focus {
    box-shadow: none;
  }
`
export const MsLogoIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${MsLogo}") center no-repeat;
`

export const HomeIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${Home}") center no-repeat;
`

export const ArticleIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${Article}") center no-repeat;
`

export const MediaIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${Media}") center no-repeat;
`

export const AssociateIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${Associate}") center no-repeat;
`

export const TrashIcon = styled(HoverIcon)`
  width: 40px;
  height: 40px;
  background: url("${TrashCan}") center no-repeat;
`
