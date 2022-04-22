import { parse, ParseOptions, stringify } from "query-string"
import { omit, prop } from "rambda"
import { useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../../../storeConfig"
import { mediasDisplaySlice, mediasFilteredByUrlSelector } from "../medias/reducers"

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
  const { actions } = mediasDisplaySlice
  const location = useLocation()

  const { lastFilter: lastMediaFilter } = getState(prop("mediasDisplay"))

  const isBin = location.search.includes("bin")
  const isActive = (x: string) => (!isBin && location.pathname.includes(x) ? "true" : "false")

  const displayedMedias = getState((x) => mediasFilteredByUrlSelector(x, location.search))

  const displayedMediaIds = displayedMedias.map(prop("id"))

  const deselectAll = () =>
    dispatch(actions.updateUserBadgesCompleteSelection({ selectionType: "deselect", displayedMediaIds }))

  return { lastMediaFilter, isBin, isActive, deselectAll }
}
