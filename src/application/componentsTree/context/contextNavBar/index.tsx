import { prop } from "rambda"
import React from "react"
import { Link, useLocation } from "react-router-dom"

import { HStack } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import { mediaDisplaySlice } from "../../../reducers"
import { navigateWithFilter } from "./privates"
import { AppLink } from "./styles"

const ContextNavigationBar = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { lastFilter: lastMediaFilter } = getState(prop("mediaDisplay"))

  const isBin = useLocation().search.includes("bin")
  const isActive = (x: string) => (!isBin && location.pathname.includes(x) ? "true" : "false")

  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectedMediaIds: [] }))

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

export default ContextNavigationBar
