import { parse, ParsedQuery, ParseOptions, stringify } from "query-string"
import { isEmpty, omit, prop, trim, uniq } from "rambda"
import { NavigateFunction } from "react-router-dom"

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

export const toggleOffTextFilters = (search: string): string =>
  stringify(omit("textFilter", parse(search, routerParseOptions)), routerParseOptions)

export const setTextFilter = (textInput: string, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)

  const updateFilters = uniq(textInput.split(",").map(trim))

  if (updateFilters[0] === "") return toggleOffTextFilters(search)

  return stringify({ ...queryObjectParameters, textFilter: updateFilters }, routerParseOptions)
}

export const toggleStatusFilter = (status: string, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)
  const rawStatusFilters = queryObjectParameters.status ?? []
  const statusFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]

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
  (
    state: State,
    updateFilterSideEffects: (newSearch: string, filteredMediaIds: string[]) => void,
    navigate: NavigateFunction,
  ) =>
  (newSearch: string) => {
    const filteredMedia = mediaFilteredSelector(state, newSearch)
    const filteredMediaIds = filteredMedia.map(prop("id"))
    updateFilterSideEffects(newSearch, filteredMediaIds)
    const searchToken = isEmpty(newSearch) ? "" : "?"

    navigate(`${searchToken}${newSearch}`)
  }
