import { parse } from "query-string"
import { any, filter, groupBy, isEmpty, isNil, prop, reject } from "rambda"
import { ToastOptions } from "react-toastify"

import { theme } from "@chakra-ui/react"

import {
  Context,
  ControlStatus,
  MediumItem,
  PaginatedResponse,
  RawContext,
  RawMedium,
  RawReference,
  ReferenceItem,
} from "./types"

export const getImageServerUrl = (id: string, size: number, whiteReplacement: boolean) => {
  const replaceColor = whiteReplacement ? "rc:ffffff-FF0000/" : ""

  return `${process.env.IMAGE_SERVER_MEDIA_URL}${replaceColor}/r:${size}x${size}/${process.env.MEDIASHARE_API_IMAGE_URL}/media/${id}/blob`
}

export const toAppContext = (response: RawContext): Context => ({ id: response.id, label: response.label })

export const toMediumItem = (response: RawMedium[]): MediumItem[] =>
  response.map((x) => ({
    id: x.id,
    fileName: x.fileName,
    width: x.metadata?.width,
    height: x.metadata?.height,
    status: x.computedQualityControl,
    controlId: x.dmapId,
    trashed: x.trashed,
    isAssociable: x.isAssociable,
  }))

export const paginatedToReferenceItem = (response: PaginatedResponse<RawReference>): ReferenceItem[] =>
  response.items.map((x) => ({
    id: x.id,
    familyId: String(x.familyId),
    mediaAssociations: x.mediaAssociations,
  }))

export const rawToReferenceItem = (rawReference: Partial<RawReference>): Partial<ReferenceItem> => {
  return reject(isNil, {
    id: rawReference.id,
    familyId: rawReference.familyId ? String(rawReference.familyId) : rawReference.familyId,
    mediaAssociations: rawReference.mediaAssociations,
  })
}

export const getHotkeys = (shortcuts: Record<string, string>): string =>
  Object.values(shortcuts).reduce((acc: any, val: any, index: number) => (index === 0 ? val : `${acc},${val}`), "")

export const getMediaGroupedByFilter = (media: MediumItem[]): Record<string, MediumItem[]> => {
  const mediaGroupedByStatus = groupBy(prop("status"), media)
  const mediaGroupedByControlStatus = groupBy(
    (medium) => (isNil(medium.controlId) ? ControlStatus.Pending : ControlStatus.Validated),
    media,
  )
  return { ...mediaGroupedByStatus, ...mediaGroupedByControlStatus }
}

export const getFilteredMedia = (media: MediumItem[], search: string): MediumItem[] => {
  const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })

  const rawStatusFilters = queryObjectParameters.status ?? []
  const statusFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]

  const controlFilter = queryObjectParameters.control as string | null

  const rawTextFilter = queryObjectParameters.textFilter ?? []
  const textFilters = Array.isArray(rawTextFilter) ? rawTextFilter : [rawTextFilter]

  const binDisplay = queryObjectParameters.bin

  const filteredMedia = media.filter((medium) => {
    const binFilterKeep = binDisplay ? medium.trashed : !medium.trashed

    const textFilterKeep = isEmpty(textFilters)
      ? true
      : any(
          (textFilter) => medium.fileName.includes(textFilter),
          textFilters.filter((x) => x !== ""),
        )

    const statusFilterKeep = isEmpty(statusFilters) ? true : statusFilters.includes(medium.status)
    const controlFilterKeep = !controlFilter
      ? true
      : controlFilter === ControlStatus.Validated
      ? !isNil(medium.controlId)
      : isNil(medium.controlId)

    return binFilterKeep && controlFilterKeep && statusFilterKeep && textFilterKeep
  })

  return filteredMedia
}

export const toastOptions: ToastOptions = {
  position: "bottom-center",
  style: { textAlign: "center", fontWeight: theme.fontWeights.bold },
}
