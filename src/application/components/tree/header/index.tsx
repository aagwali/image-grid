import React from "react"

import { Center } from "@chakra-ui/react"
import { Link } from "@reach/router"

import { HeaderHStack } from "./styles"

const Header = () => {
  return (
    <Center>
      <HeaderHStack>
        <Link children="Home" to="/home" />
        <Link children="Grid" to="/grid" />
      </HeaderHStack>
    </Center>
  )
}

export default Header
