import React from "react"

import { Box, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "@reach/router"

import { NavBarBox } from "./styles"

const NavBar = () => {
  return (
    <Box>
      <NavBarBox spacing={10}>
        <Link mr={32} as={RouterLink} children="Home" to="/" />
        <Link as={RouterLink} children="References" to="medias" />
        <Link as={RouterLink} children="Medias" to="medias" />
      </NavBarBox>
    </Box>
  )
}

export default NavBar
