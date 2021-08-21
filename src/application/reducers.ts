import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../storeConfig"
import { getMediaByContextLabel } from "./services"
import { MediumItem, NeutralState } from "./types"

export const authSlice = createSlice({
  name: "authenticated",
  initialState: false,
  reducers: { setAuthenticated: (authenticated, action: PayloadAction<typeof authenticated>) => action.payload },
})

const mediaAdapter = createEntityAdapter<MediumItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})
export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)

export const mediaSlice = createSlice({
  name: "media",
  initialState: mediaAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getMediaByContextLabel.matchFulfilled, (state, action) => {
      mediaAdapter.upsertMany(state, action.payload)
    })
  },
})

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
    transparency: false,
    lightBoxMediumId: "none",
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
