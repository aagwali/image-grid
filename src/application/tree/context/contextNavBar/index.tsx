import { includes, prop } from "rambda"
import React from "react"

import { HStack } from "@chakra-ui/react"
import { Link, Location } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import { mediaDisplaySlice } from "../../../reducers"
import { navigateWithFilter } from "./privates"
import { AppLink } from "./styles"

const ContextNavigationBar = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { lastFilter: lastMediaFilter } = getState(prop("mediaDisplay"))

  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))

  return (
    <Location>
      {({ location }) => {
        const isBin = location.search.includes("bin")
        const isActive = (x: string) => (!isBin && location.pathname.includes(x) ? "true" : "false")

        return (
          <HStack ml={1} spacing={3}>
            <Link to={navigateWithFilter("medias")}>
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
      }}
    </Location>
  )
}

export default ContextNavigationBar
