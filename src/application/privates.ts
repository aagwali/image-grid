import { MediumItem, RawMedium } from "./types"

export const getImageServerUrl = (id: string, size: number, whiteReplacement: boolean) => {
  const replaceColor = whiteReplacement ? "rc:ffffff-FF0000/" : ""

  return `${process.env.IMAGE_SERVER_MEDIA_URL}${replaceColor}r:${size}x${size}/${process.env.MEDIASHARE_API_URL}media/${id}/blob`
}

export const formatGetMediaResult = (response: RawMedium[]): MediumItem[] =>
  response.map((x) => ({
    ...x,
    width: x.metadata.width,
    height: x.metadata.height,
    status: x.computedQualityControl,
    controlId: x.dmapId,
    trashed: x.trashed,
  }))

export const getHotkeys = (shortcuts: Record<string, string>): string =>
  Object.values(shortcuts).reduce((acc: any, val: any, index: number) => (index === 0 ? val : `${acc},${val}`), "")
