import { parse, ParsedQuery, stringify } from "query-string"
import { omit } from "rambda"

import { ControlStatus, QualityStatus } from "../../../../types"

export const getStatusFilters = (search: string): string[] => {
  const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
  const rawFilters = queryObjectParameters.status ?? []
  const filters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  return filters
}

export const isAllQualityFilterChecked = (search: string): boolean =>
  getStatusFilters(search).length === Object.keys(QualityStatus).length

export const isStatusFilterActive = (search: string, status: string): boolean =>
  getStatusFilters(search).includes(status)

export const toggleStatusFilter =
  (status: string) =>
  (search: string): string => {
    const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
    const rawFilters = queryObjectParameters.status ?? []
    const statusFilters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

    const updateFilters = statusFilters.includes(status)
      ? statusFilters.filter((y) => y !== status)
      : [...statusFilters, status]

    const newQueryObjectParameters = { ...queryObjectParameters, status: updateFilters }

    const newQueryParameters = stringify(newQueryObjectParameters, {
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
    })

    return newQueryParameters
  }

export const toggleAllQualityFilters =
  (checked: boolean) =>
  (search: string): string => {
    const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })

    const newQueryObjectParameters = checked
      ? { ...queryObjectParameters, status: Object.values(QualityStatus) }
      : (omit("status", queryObjectParameters) as ParsedQuery<string>)

    const newQueryParameters = stringify(newQueryObjectParameters, {
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
    })

    return newQueryParameters
  }

export const toggleOffControlFilters = (search: string): string => {
  const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
  const newQueryObjectParameters = omit("control", queryObjectParameters) as ParsedQuery<string>

  const newQueryParameters = stringify(newQueryObjectParameters, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|",
  })

  return newQueryParameters
}

export const isControlFilterActive = (search: string, controlFilter: ControlStatus): boolean =>
  parse(search).control === controlFilter

export const toggleControlFilter =
  (controlFilter: ControlStatus) =>
  (search: string): string => {
    const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })
    const control = queryObjectParameters.control as string

    const newQueryObjectParameters =
      controlFilter === control
        ? (omit("control", queryObjectParameters) as ParsedQuery<string>)
        : { ...queryObjectParameters, control: controlFilter }

    const newQueryParameters = stringify(newQueryObjectParameters, {
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
    })

    return newQueryParameters
  }
