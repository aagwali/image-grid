import { PayloadAction } from "@reduxjs/toolkit"

import { Display } from "./types"

export const updateContentSize = (display: Display, action: PayloadAction<number>): Display => {
  display.contentSize = action.payload
  return display
}

export const updateTransparency = (display: Display, action: PayloadAction<boolean>): Display => {
  display.transparency = action.payload
  return display
}

export const updateLightBoxMediaId = (display: Display, action: PayloadAction<string>): Display => {
  display.lightBoxItemId = action.payload
  return display
}
