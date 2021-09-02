import React from "react"

import { HStack } from "@chakra-ui/react"
import { Link, Location } from "@reach/router"

import { AppLink } from "./styles"

const ContextNavigationBar = () => (
  <Location>
    {({ location }) => {
      const isActive = (x: string) => (location.pathname.includes(x) ? "true" : "false")

      return (
        <HStack ml={1} spacing={3}>
          <Link to={"medias"}>
            <AppLink active={isActive("references")} children={"References"} />
          </Link>
          <Link to={"medias"}>
            <AppLink active={isActive("medias")} children={"Medias"} />
          </Link>
          <Link to={"medias"}>
            <AppLink active={isActive("associations")} children={"Associations"} />
          </Link>
          <Link to={"medias"}>
            <AppLink active={isActive("trash")} children={"Trash can"} />
          </Link>
        </HStack>
      )
    }}
  </Location>
)

export default ContextNavigationBar
