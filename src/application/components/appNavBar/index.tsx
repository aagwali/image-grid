import React from "react"
import { Link as RouterLink } from "react-router-dom"

import { HomeIcon, MsLogoIcon, NavBarBox, NavBarLink } from "./styles"

const AppNavigationBar = () => (
  <NavBarBox spacing={1}>
    <NavBarLink as={RouterLink} to="/">
      <MsLogoIcon />
    </NavBarLink>
    <NavBarLink as={RouterLink} to="/">
      <HomeIcon />
    </NavBarLink>
  </NavBarBox>
)

export default AppNavigationBar
