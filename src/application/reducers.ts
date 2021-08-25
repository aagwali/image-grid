import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../storeConfig"
import { getMediaByContextLabel } from "./services"
import { MediumItem } from "./types"

export const authSlice = createSlice({
  name: "authenticated",
  initialState: false,
  reducers: { setAuthenticated: (authenticated, { payload }: PayloadAction<typeof authenticated>) => payload },
})

export const contextSlice = createSlice({
  name: "context",
  initialState: "",
  reducers: { initiateContext: (context, { payload }: PayloadAction<Partial<typeof context>>) => payload },
})

const mediaAdapter = createEntityAdapter<MediumItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})
export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)
export const mediaSlice = createSlice({
  name: "media",
  initialState: mediaAdapter.getInitialState({ loaded: false }),
  reducers: {
    setLoaded: (media) => {
      media.loaded = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contextSlice.actions.initiateContext, (media, _) => {
        mediaAdapter.removeAll(media)
        media.loaded = false
      })
      .addMatcher(getMediaByContextLabel.matchFulfilled, (media, action) => {
        mediaAdapter.upsertMany(media, action.payload)
        mediaSlice.caseReducers.setLoaded(media)
      })
  },
})

const initialMediaGridDisplay = {
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  transparency: false,
  lightBoxMediumId: "none",
  scrollRatio: 0,
  cellMatrix: {
    columnCount: 10,
    cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  },
}

export const mediaGridDisplaySlice = createSlice({
  name: "mediaGridDisplay",
  initialState: initialMediaGridDisplay,
  reducers: {
    updateDisplay: (display, action: PayloadAction<Partial<typeof display>>) => ({
      ...display,
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.initiateContext, () => ({ ...initialMediaGridDisplay }))
  },
})

// TODO config check projection
// last = no reducers, only extra reducers on interceptipn selection event ()
