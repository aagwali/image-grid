import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { updateContentSize, updateLightBoxMediaId, updateTransparency } from "./components/tree/body/mediaGrid/privates"
import { NeutralState } from "./types"

export const authSlice = createSlice({
  name: "authenticated",
  initialState: false,
  reducers: { setAuthenticated: (_, _action) => true },
})

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
    transparency: false,
    lightBoxItemId: "none",
  },
  reducers: { updateContentSize, updateTransparency, updateLightBoxMediaId },
})

export const errorSlice = createSlice({
  name: "errorAction",
  initialState: {
    type: "initialErrorAction",
    payload: { type: NeutralState.NoError, payload: {} },
  },
  reducers: { setErrorAction: (_, action) => action },
})

export const baseMsApi = createApi({
  reducerPath: "msApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  endpoints: () => ({}),
})
