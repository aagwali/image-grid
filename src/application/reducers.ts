import { prop } from "rambda"

import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../storeConfig"
import { getMediaByContextLabel } from "./services"
import { MediumItem } from "./types"

//#region CONTEXT
export const contextSlice = createSlice({
  name: "context",
  initialState: "",
  reducers: { initiateContext: (context, { payload }: PayloadAction<typeof context>) => payload },
})
//#endregion

//#region MEDIA
const mediaAdapter = createEntityAdapter<MediumItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})

export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)

export const mediaSelectedSelector = createSelector(
  [prop("mediaDisplay"), (state: State) => (id: string) => mediaSelector.selectById(state, id)], // curried
  ({ selectMediaIds }, selectMediaById) => selectMediaIds.map(selectMediaById),
)

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
        mediaAdapter.setAll(media, action.payload)
        mediaSlice.caseReducers.setLoaded(media)
      })
  },
})

//#endregion

//#region MEDIA GRID
const initialMediaDisplay = {
  selectMediaIds: [] as string[],
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  transparency: false,
  cardHeader: false,
  badges: false,
  lightBoxMediumId: "none",
  scrollRatio: 0,
  cellMatrix: {
    columnCount: 10,
    cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  },
}

export const mediaDisplaySlice = createSlice({
  name: "mediaDisplay",
  initialState: initialMediaDisplay,
  reducers: {
    updateMediaDisplay: (mediaDisplay, { payload }: PayloadAction<Partial<typeof mediaDisplay>>) => ({
      ...mediaDisplay,
      ...payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.initiateContext, () => ({ ...initialMediaDisplay }))
  },
})
//#endregion
