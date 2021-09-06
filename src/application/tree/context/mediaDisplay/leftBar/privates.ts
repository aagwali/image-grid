import { parse, ParsedQuery, ParseOptions, stringify } from "query-string"
import { isEmpty, omit, prop } from "rambda"

import { navigate } from "@reach/router"

import { State } from "../../../../../storeConfig"
import { mediaFilteredSelector } from "../../../../reducers"
import { ControlStatus, QualityStatus } from "../../../../types"

const routerParseOptions = { arrayFormat: "separator", arrayFormatSeparator: "|" } as ParseOptions

export const getStatusFilters = (search: string): string[] => {
  const queryObjectParameters = parse(search, routerParseOptions)
  const rawFilters = queryObjectParameters.status ?? []
  const filters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  return filters
}

export const isAllQualityFilterChecked = (search: string): boolean =>
  getStatusFilters(search).length === Object.keys(QualityStatus).length

export const isStatusFilterActive = (search: string, status: string): boolean =>
  getStatusFilters(search).includes(status)

export const toggleStatusFilter = (status: string, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)
  const rawFilters = queryObjectParameters.status ?? []
  const statusFilters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  const updateFilters = statusFilters.includes(status)
    ? statusFilters.filter((y) => y !== status)
    : [...statusFilters, status]

  return stringify({ ...queryObjectParameters, status: updateFilters }, routerParseOptions)
}

export const toggleAllQualityFilters = (checked: boolean, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)

  const newQueryObjectParameters = checked
    ? { ...queryObjectParameters, status: Object.values(QualityStatus) }
    : (omit("status", queryObjectParameters) as ParsedQuery<string>)

  const newQueryParameters = stringify(newQueryObjectParameters, routerParseOptions)

  return newQueryParameters
}

export const toggleOffControlFilters = (search: string): string =>
  stringify(omit("control", parse(search, routerParseOptions)), routerParseOptions)

export const isControlFilterActive = (search: string, controlFilter: ControlStatus): boolean =>
  parse(search).control === controlFilter

export const toggleControlFilter = (controlFilter: ControlStatus, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)

  const newQueryObjectParameters =
    controlFilter === queryObjectParameters.control
      ? (omit("control", queryObjectParameters) as ParsedQuery<string>)
      : { ...queryObjectParameters, control: controlFilter }

  return stringify(newQueryObjectParameters, routerParseOptions)
}

export const updateFilter_ =
  (state: State, updateFilterSideEffects: (newSearch: string, filteredMediaIds: string[]) => void) =>
  (newSearch: string) => {
    const filteredMedia = mediaFilteredSelector(state, newSearch)
    const filteredMediaIds = filteredMedia.map(prop("id"))
    updateFilterSideEffects(newSearch, filteredMediaIds)
    const searchToken = isEmpty(newSearch) ? "" : "?"

    navigate(`medias${searchToken}${newSearch}`)
  }
