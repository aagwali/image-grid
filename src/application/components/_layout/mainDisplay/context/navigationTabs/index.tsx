import React from "react"
import { Link } from "react-router-dom"

import { HStack } from "@chakra-ui/react"

import { getPropContainer, navigateWithFilter } from "./privates"
import { AppLink } from "./styles"

const NavigationTabs = () => {
  const { lastMediaFilter, isBin, isActive, deselectAll } = getPropContainer()

  return (
    <HStack ml={1} spacing={3}>
      <Link to={navigateWithFilter("references")}>
        <AppLink active={isActive("references")} children={"References"} />
      </Link>
      <Link to={navigateWithFilter("medias", lastMediaFilter)}>
        <AppLink onClick={deselectAll} active={isActive("medias")} children={"Medias"} />
      </Link>
      <Link to={navigateWithFilter("medias")}>
        <AppLink active={isActive("associations")} children={"Associations"} />
      </Link>
      <Link to={navigateWithFilter("bin", lastMediaFilter)}>
        <AppLink onClick={deselectAll} active={isBin.toString()} children={"Bin"} />
      </Link>
    </HStack>
  )
}

export default NavigationTabs
