import React from "react"

import { Link } from "@chakra-ui/react"
import { Link as RouterLink } from "@reach/router"

import AppToolTip from "../../appTooltip"
import { ArticleIcon, AssociateIcon, HomeIcon, MediaIcon, MsLogoIcon, NavBarBox, TrashIcon } from "./styles"

const NavigationBar = ({ home }: any) => {
  return (
    <NavBarBox spacing={1}>
      <Link as={RouterLink} to="/">
        <MsLogoIcon />
      </Link>
      <AppToolTip tooltip={"home"}>
        <Link as={RouterLink} to="/">
          <HomeIcon />
        </Link>
      </AppToolTip>
      {!home && (
        <React.Fragment>
          <AppToolTip tooltip={"article"}>
            <Link as={RouterLink} to="medias">
              <ArticleIcon />
            </Link>
          </AppToolTip>
          <AppToolTip tooltip={"media"}>
            <Link as={RouterLink} to="medias">
              <MediaIcon />
            </Link>
          </AppToolTip>
          <AppToolTip tooltip={"association"}>
            <Link as={RouterLink} to="medias">
              <AssociateIcon />
            </Link>
          </AppToolTip>
          <AppToolTip tooltip={"trash"}>
            <Link as={RouterLink} to="medias">
              <TrashIcon />
            </Link>
          </AppToolTip>
        </React.Fragment>
      )}
    </NavBarBox>
  )
}

export default NavigationBar
