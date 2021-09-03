import { parse, stringify } from "query-string"
import { isEmpty } from "rambda"

import { WindowLocation } from "@reach/router"

export const toggleStatusFilter = (location: WindowLocation<unknown>, status: string): string => {
  const queryObjectParameters = parse(location.search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
  const rawFilters = queryObjectParameters.filters ?? []
  const filters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  const updateFilters = filters.includes(status) ? filters.filter((y) => y !== status) : [...filters, status]

  const newQueryObjectParameters = { ...queryObjectParameters, filters: updateFilters }

  const newQueryParameters = stringify(newQueryObjectParameters, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|",
  })

  return isEmpty(newQueryParameters) ? newQueryParameters : `?${newQueryParameters}`
}

export const isFilterActive = (location: WindowLocation<unknown>, status: string): boolean => {
  const queryObjectParameters = parse(location.search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
  const rawFilters = queryObjectParameters.filters ?? []
  const filters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  return filters.includes(status)
}
