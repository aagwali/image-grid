import React from "react"

import { Center } from "@chakra-ui/react"
import { Link } from "@reach/router"

import { NavBarBox } from "./styles"

const NavBar = () => {
  return (
    <Center>
      <NavBarBox>
        <Link children="Home" to="/" />
        <Link children="Medias" to="medias" />
      </NavBarBox>
    </Center>
  )
}

export default NavBar
