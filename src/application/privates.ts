import { MediumItem, RawMedium } from "./types"

export const getImageServerUrl = (mediaUid: string, size: number) =>
  `${process.env.IMAGE_SERVER_MEDIA_URL}r:${size}x${size}/${process.env.MEDIASHARE_API_URL}media/${mediaUid}/blob`

export const formatApiResult = (response: RawMedium[]): MediumItem[] => response
