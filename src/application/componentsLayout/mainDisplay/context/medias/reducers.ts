import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../../../../../storeConfig"
import { getFilteredMedia, getMediaGroupedByFilter } from "../../../../privates"
import {
  getContextByLabel,
  getMediaByContextLabel,
  triggerRestoreMedia,
  triggerTrashMedia,
  triggerUploadMedia,
} from "../../../../services"
import { MediumItem } from "../../../../types"
import { contextSlice } from "../reducers"

const mediaAdapter = createEntityAdapter<MediumItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})

export const mediaSlice = createSlice({
  name: "media",
  initialState: mediaAdapter.getInitialState({ loaded: false }),
  reducers: {
    setLoaded: (media, { payload: loaded }: PayloadAction<boolean>) => {
      media.loaded = loaded
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getContextByLabel.matchPending, (media, _) => {
        mediaAdapter.removeAll(media)
        media.loaded = false
      })
      .addMatcher(getMediaByContextLabel.matchPending, (media) => {
        media.loaded = false
      })
      .addMatcher(getMediaByContextLabel.matchFulfilled, (media, { payload: fetchedMedia }) => {
        mediaAdapter.removeAll(media)
        mediaAdapter.setAll(media, fetchedMedia)
        media.loaded = true
      })
      .addMatcher(triggerUploadMedia.matchFulfilled, (media, { payload: fetchedMedium }) => {
        mediaAdapter.addOne(media, fetchedMedium)
      })
      .addMatcher(triggerTrashMedia.matchPending, (media, action) => {
        const trashedMedium = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          trashedMedium.map((id) => ({ id, changes: { trashed: true, isAssociable: false } })),
        )
      })
      .addMatcher(triggerRestoreMedia.matchPending, (media, action) => {
        const restoredMedium = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          restoredMedium.map((id) => ({ id, changes: { trashed: false, isAssociable: true } })),
        )
      })
  },
})

export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)
export const mediaByFilterSelector = createSelector(mediaSelector.selectAll, getMediaGroupedByFilter)
export const mediaFilteredSelector = createSelector(
  [mediaSelector.selectAll, (_: State, search: string) => search],
  getFilteredMedia,
)

const initialMediaDisplay = {
  selectedMediaIds: [] as string[],
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 230,
  transparency: false,
  cardHeader: false,
  badges: false,
  lightBoxMediumId: "none",
  scrollRatio: 0,
  whiteReplacement: false,
  lastFilter: "",
  uploadProgress: 0,
  cellMatrix: {
    columnCount: 10,
    cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 230,
  },
}

export const mediaDisplaySlice = createSlice({
  name: "mediasDisplay",
  initialState: initialMediaDisplay,
  reducers: {
    updateMediaDisplay: (mediasDisplay, { payload }: PayloadAction<Partial<typeof mediasDisplay>>) => ({
      ...mediasDisplay,
      ...payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.resetContext, (mediasDisplay) => ({
      ...initialMediaDisplay,
      uploadProgress: mediasDisplay.uploadProgress,
    }))
  },
})
