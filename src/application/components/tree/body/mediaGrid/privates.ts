import { PayloadAction } from "@reduxjs/toolkit"

import { MediumItem } from "../../../../types"
import { Display, RawMedium } from "./types"

export const updateContentSize = (display: Display, action: PayloadAction<number>): Display => {
  display.contentSize = action.payload
  return display
}

export const updateTransparency = (display: Display, action: PayloadAction<boolean>): Display => {
  display.transparency = action.payload
  return display
}

export const updateLightBoxMediaId = (display: Display, action: PayloadAction<string>): Display => {
  display.lightBoxMediaId = action.payload
  return display
}

export const getImageServerUrl = (mediaUid: string, size: number) =>
  `${process.env.IMAGE_SERVER_MEDIA_URL}r:${size}x${size}/${process.env.MEDIASHARE_API_URL}media/${mediaUid}/blob`

export const formatApiResult = (response: RawMedium[]): MediumItem[] => response
