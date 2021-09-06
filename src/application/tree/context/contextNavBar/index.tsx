import { parse, ParseOptions, stringify } from "query-string"
import { includes, omit, prop } from "rambda"
import React from "react"

import { HStack } from "@chakra-ui/react"
import { Link, Location } from "@reach/router"

import { useAppSelector as getState } from "../../../../storeConfig"
import { AppLink } from "./styles"

const routerParseOptions = { arrayFormat: "separator", arrayFormatSeparator: "|" } as ParseOptions

export const navigateWithFilter = (page: string, lastMediaFilter: string = "") => {
  const newQueryParameters = stringify(omit("bin", parse(lastMediaFilter, routerParseOptions)), routerParseOptions)
  const token = newQueryParameters === "" ? "" : "&"

  if (page === "medias") return `${page}?${newQueryParameters}`
  if (page === "bin") return `medias?${newQueryParameters}${token}bin=true`

  return "navigationError"
}

const ContextNavigationBar = () => {
  const { lastFilter: lastMediaFilter } = getState(prop("mediaDisplay"))

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
              <AppLink active={isActive("medias")} children={"Medias"} />
            </Link>
            <Link to={navigateWithFilter("medias")}>
              <AppLink active={isActive("associations")} children={"Associations"} />
            </Link>
            <Link to={navigateWithFilter("bin", lastMediaFilter)}>
              <AppLink active={isBin.toString()} children={"Bin"} />
            </Link>
          </HStack>
        )
      }}
    </Location>
  )
}

export default ContextNavigationBar
