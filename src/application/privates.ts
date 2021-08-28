import { MediumItem, RawMedium } from "./types"

export const getImageServerUrl = (id: string, size: number) =>
  `${process.env.IMAGE_SERVER_MEDIA_URL}r:${size}x${size}/${process.env.MEDIASHARE_API_URL}media/${id}/blob`

export const formatApiResult = (response: RawMedium[]): MediumItem[] => response

export const getHotkeys = (shortcuts: Record<string, string>): string =>
  Object.values(shortcuts).reduce((acc: any, val: any, index: number) => (index === 0 ? val : `${acc},${val}`), "")
