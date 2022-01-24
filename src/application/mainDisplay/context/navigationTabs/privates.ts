import { parse, ParseOptions, stringify } from "query-string"
import { omit, prop } from "rambda"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import { mediaDisplaySlice } from "../medias/reducers"

const routerParseOptions = { arrayFormat: "separator", arrayFormatSeparator: "|" } as ParseOptions

export const navigateWithFilter = (page: string, lastMediaFilter: string = "") => {
  const newQueryParameters = stringify(omit("bin", parse(lastMediaFilter, routerParseOptions)), routerParseOptions)
  const token = newQueryParameters === "" ? "" : "&"

  if (page === "medias") return `${page}?${newQueryParameters}`
  if (page === "bin") return `medias?${newQueryParameters}${token}bin=true`
  if (page === "references") return `${page}`

  return "navigationError"
}

export const getPropContainer = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { lastFilter: lastMediaFilter } = getState(prop("mediaDisplay"))

  const isBin = useLocation().search.includes("bin")
  const isActive = (x: string) => (!isBin && location.pathname.includes(x) ? "true" : "false")

  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectedMediaIds: [] }))
  return { lastMediaFilter, isBin, isActive, deselectAll }
}
