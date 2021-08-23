import React from "react"

import { Center } from "@chakra-ui/react"
import { Link } from "@reach/router"

import { HeaderBox } from "./styles"

const Header = () => {
  return (
    <Center>
      <HeaderBox>
        <Link children="Home" to="/home" />
        <Link children="Grid" to="/grid" />
      </HeaderBox>
    </Center>
  )
}

export default Header
