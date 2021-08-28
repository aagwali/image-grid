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
  [prop("mediaGrid"), (state: State) => (id: string) => mediaSelector.selectById(state, id)], // curried
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
const initialMediaGrid = {
  selectMediaIds: [] as string[],
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  transparency: false,
  lightBoxMediumId: "none",
  scrollRatio: 0,
  cellMatrix: {
    columnCount: 10,
    cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 250,
  },
}

export const mediaGridSlice = createSlice({
  name: "mediaGrid",
  initialState: initialMediaGrid,
  reducers: {
    updateMediaGrid: (mediaGrid, { payload }: PayloadAction<Partial<typeof mediaGrid>>) => ({
      ...mediaGrid,
      ...payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.initiateContext, () => ({ ...initialMediaGrid }))
  },
})
//#endregion
