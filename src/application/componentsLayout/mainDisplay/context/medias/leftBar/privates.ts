import { parse, ParsedQuery, ParseOptions, stringify } from "query-string"
import { all, any, identity, intersection, isEmpty, omit, prop, trim, uniq } from "rambda"
import { useState } from "react"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom"

import { State, useAppDispatch, useAppSelector as getState } from "../../../../../../storeConfig"
import { ColorBadges, ControlStatus, QualityStatus } from "../../../../../types"
import { mediasDisplaySlice, mediasFilteredByUrlSelector, mediaStatusDictionarySelector } from "../reducers"
import { LeftBarShortcuts } from "./types"

const routerParseOptions = { arrayFormat: "separator", arrayFormatSeparator: "|" } as ParseOptions

export const getFilters = (filterType: string, search: string): string[] => {
  const queryObjectParameters = parse(search, routerParseOptions)
  const rawFilters = queryObjectParameters[filterType] ?? []
  const filters = Array.isArray(rawFilters) ? rawFilters : [rawFilters]

  return filters
}

export const isAllUserStarsFilterChecked = (search: string): boolean =>
  getFilters("userStars", search).length === Object.keys(ColorBadges).length

export const isAllColorBadgesFilterChecked = (search: string): boolean =>
  getFilters("colorBadges", search).length === Object.keys(ColorBadges).length

export const isAllQualityFilterChecked = (search: string): boolean =>
  getFilters("status", search).length === Object.keys(QualityStatus).length

export const isFilterActive = (requestedFilter: string, search: string, status: string): boolean =>
  getFilters(requestedFilter, search).includes(status)

export const toggleOffTextFilters = (search: string): string =>
  stringify(omit("textFilter", parse(search, routerParseOptions)), routerParseOptions)

export const setTextFilter = (textInput: string, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)

  const updateFilters = uniq(textInput.split(",").map(trim))

  if (updateFilters[0] === "") return toggleOffTextFilters(search)

  return stringify({ ...queryObjectParameters, textFilter: updateFilters }, routerParseOptions)
}

export const toggleFilter = (targetStatus: string, status: string, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)
  const rawStatusFilters = queryObjectParameters[targetStatus] ?? []
  const targetFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]

  const updateFilters = targetFilters.includes(status)
    ? targetFilters.filter((y) => y !== status)
    : [...targetFilters, status]

  return stringify({ ...queryObjectParameters, [targetStatus]: updateFilters }, routerParseOptions)
}

export const toggleAllFilters = (target: string, statuses: string[], checked: boolean, search: string): string => {
  const queryObjectParameters = parse(search, routerParseOptions)

  const newQueryObjectParameters = checked
    ? { ...queryObjectParameters, [target]: statuses }
    : (omit(target, queryObjectParameters) as ParsedQuery<string>)

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
    const filteredMedia = mediasFilteredByUrlSelector(state, newSearch)
    const filteredMediaIds = filteredMedia.map(prop("id"))
    updateFilterSideEffects(newSearch, filteredMediaIds)
    const searchToken = isEmpty(newSearch) ? "" : "?"

    navigate(`${searchToken}${newSearch}`)
  }

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = mediasDisplaySlice
  const { search } = useLocation()
  const navigate = useNavigate()

  const { transparency, contentSize, cellMatrix, cardHeader, badges, selectedMediaIds, whiteReplacement } = getState(
    prop("mediasDisplay"),
  )

  const itemsByFilterData = getState(mediaStatusDictionarySelector)

  const allCheckedDisplay = all(identity, [cardHeader, badges, transparency, whiteReplacement])
  const isIndeterminateDisplay =
    any(identity, [cardHeader, badges, transparency, whiteReplacement]) && !allCheckedDisplay
  const allCheckedQualityFilters = isAllQualityFilterChecked(search)
  const isIndeterminateQualityFilters = !isEmpty(getFilters("status", search)) && !allCheckedQualityFilters
  const controlIsIndeterminate =
    isControlFilterActive(search, ControlStatus.Validated) || isControlFilterActive(search, ControlStatus.Pending)

  const toggleCardHeader = () => dispatch(actions.updateMediaDisplay({ cardHeader: !cardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateMediaDisplay({ badges: !badges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(
      actions.updateMediaDisplay({
        cardHeader: checked,
        badges: checked,
        transparency: checked,
        whiteReplacement: checked,
      }),
    )
  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const toggleWhiteClipping = () => dispatch(actions.updateMediaDisplay({ whiteReplacement: !whiteReplacement }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaDisplay({ contentSize: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))

  const updateFilterSideEffects = (newSearch: string, filteredMediaIds: string[]) =>
    dispatch(
      actions.updateMediaDisplay({
        selectedMediaIds: intersection(filteredMediaIds, selectedMediaIds),
        scrollRatio: 0,
        lastFilter: newSearch,
      }),
    )

  const allCheckedColorBadgesFilters = isAllColorBadgesFilterChecked(search)
  const isIndeterminateColorBadge = !isEmpty(getFilters("colorBadges", search)) && !allCheckedColorBadgesFilters
  const allCheckedUserStarsFilters = isAllUserStarsFilterChecked(search)
  const isIndeterminateUserStars = !isEmpty(getFilters("userStars", search)) && !allCheckedColorBadgesFilters

  const updateFilter = updateFilter_(getState(identity), updateFilterSideEffects, navigate)

  const [inputSearch, setInputSearch] = useState("")

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === LeftBarShortcuts.Transparency) toggleTransparency()
    if (hotkey === LeftBarShortcuts.Clipping) toggleWhiteClipping()
    if (hotkey === LeftBarShortcuts.DisplayInfos) toggleCardHeader()
    if (hotkey === LeftBarShortcuts.DisplayBadges) toggleCardBadges()
  }

  return {
    search,
    transparency,
    contentSize,
    cardHeader,
    badges,
    whiteReplacement,
    itemsByFilterData,
    allCheckedDisplay,
    isIndeterminateDisplay,
    allCheckedQualityFilters,
    isIndeterminateQualityFilters,
    controlIsIndeterminate,
    inputSearch,
    allCheckedColorFilters: allCheckedColorBadgesFilters,
    isIndeterminateColor: isIndeterminateColorBadge,
    allCheckedStarsFilters: allCheckedUserStarsFilters,
    isIndeterminateUserStars,
    toggleCardHeader,
    toggleCardBadges,
    toggleDisplayOptions,
    toggleTransparency,
    toggleWhiteClipping,
    updateContentSize,
    updateCellMatrix,
    updateFilter,
    setInputSearch,
    handleHotkey,
  }
}
