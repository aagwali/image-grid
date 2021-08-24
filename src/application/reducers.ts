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
  initialState: mediaAdapter.getInitialState({ loaded: false }),
  reducers: {
    setLoaded: (media) => {
      media.loaded = true
    },
    removeAllMedia: (media) => {
      mediaAdapter.removeAll(media)
      media.loaded = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getMediaByContextLabel.matchFulfilled, (media, action) => {
      mediaAdapter.upsertMany(media, action.payload)
      mediaSlice.caseReducers.setLoaded(media)
    })
  },
})

// TODO config check projection
// last = no reducers, only extra reducers on interceptopn selection event ()

// export const mediaSelectedSelector = mediaAdapter.getSelectors((state: State) => state.mediaSelected)

// export const mediaSelectedSlice = createSlice({
//   name: "mediaSelected",
//   initialState: mediaAdapter.getInitialState(),
//   reducers: {},
//   extraReducers: {},
//   },
// })

export const mediaGridDisplaySlice = createSlice({
  name: "mediaGridDisplay",
  initialState: {
    contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
    transparency: false,
    lightBoxMediumId: "none",
    scrollRatio: 0,
    cellMatrix: {
      columnCount: 10,
      cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
    },
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
