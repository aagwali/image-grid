import { Context, MediumItem, PaginatedResponse, RawContext, RawMedium, RawReference, ReferenceItem } from "./types"

export const getImageServerUrl = (id: string, size: number, whiteReplacement: boolean) => {
  const replaceColor = whiteReplacement ? "rc:ffffff-FF0000/" : ""

  return `${process.env.IMAGE_SERVER_MEDIA_URL}${replaceColor}r:${size}x${size}/${process.env.MEDIASHARE_API_IMAGE_URL}media/${id}/blob`
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

export const toReferenceItem = (response: PaginatedResponse<RawReference>): ReferenceItem[] =>
  response.items.map((x) => ({
    id: String(x.familyId),
    mediaAssociations: x.mediaAssociations,
  }))

export const getHotkeys = (shortcuts: Record<string, string>): string =>
  Object.values(shortcuts).reduce((acc: any, val: any, index: number) => (index === 0 ? val : `${acc},${val}`), "")
