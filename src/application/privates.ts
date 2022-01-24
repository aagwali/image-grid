import { isNil, reject } from "rambda"
import { ToastOptions } from "react-toastify"

import { theme } from "@chakra-ui/react"

import { Context, MediumItem, PaginatedResponse, RawContext, RawMedium, RawReference, ReferenceItem } from "./types"

export const getImageServerUrl = (id: string, size: number, whiteReplacement: boolean) => {
  const replaceColor = whiteReplacement ? "/rc:ffffff-FF0000/" : ""

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

export const toastOptions: ToastOptions = {
  position: "bottom-center",
  style: { textAlign: "center", fontWeight: theme.fontWeights.bold },
}
