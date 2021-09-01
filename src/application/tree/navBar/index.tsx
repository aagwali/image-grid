import { slice } from "rambda"
import React from "react"

import { Link as RouterLink, Location } from "@reach/router"

import AppToolTip from "../../appTooltip"
import { ArticleIcon, AssociateIcon, HomeIcon, MediaIcon, MsLogoIcon, NavBarBox, NavBarLink, TrashIcon } from "./styles"

const NavigationBar = () => {
  return (
    <Location>
      {({ location: { pathname } }) => {
        const rootPath = slice(0, 3, pathname.split("/")).join("/")
        return (
          <NavBarBox spacing={1}>
            <NavBarLink as={RouterLink} to="/">
              <MsLogoIcon />
            </NavBarLink>
            <NavBarLink as={RouterLink} to="/">
              <HomeIcon />
            </NavBarLink>
            {pathname !== "/" && pathname !== "/home" && (
              <React.Fragment>
                <NavBarLink as={RouterLink} to={`${rootPath}/medias`}>
                  <ArticleIcon />
                </NavBarLink>
                <NavBarLink as={RouterLink} to={`${rootPath}/medias`}>
                  <MediaIcon />
                </NavBarLink>
                <NavBarLink as={RouterLink} to={`${rootPath}/medias`}>
                  <AssociateIcon />
                </NavBarLink>
                <NavBarLink as={RouterLink} to={`${rootPath}/medias`}>
                  <TrashIcon />
                </NavBarLink>
              </React.Fragment>
            )}
          </NavBarBox>
        )
      }}
    </Location>
  )
}

export default NavigationBar
