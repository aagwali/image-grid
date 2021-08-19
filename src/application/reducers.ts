import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { NeutralState } from "./types"

export const authSlice = createSlice({
  name: "authenticated",
  initialState: false,
  reducers: { setAuthenticated: (authenticated, action: PayloadAction<typeof authenticated>) => action.payload },
})

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
    transparency: false,
    lightBoxItemId: "none",
  },
  reducers: {
    updateDisplay: (display, action: PayloadAction<Partial<typeof display>>) => ({
      ...display,
      ...action.payload,
    }),
  },
})

export const errorSlice = createSlice({
  name: "errorAction",
  initialState: {
    type: "initialErrorAction",
    payload: { type: NeutralState.NoError, payload: {} },
  },
  reducers: { setErrorAction: (_, action) => action },
})
