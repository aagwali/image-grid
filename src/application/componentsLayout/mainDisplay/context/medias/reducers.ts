import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../../../../../storeConfig"
import { MediaItem } from "../../../../types"
import { contextSlice } from "../reducers"
import { getContextByLabel } from "../services"
import { getFilteredMedia, getMediaGroupedByFilter } from "./privates"
import { getMediaByContextLabel, triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "./services"

const mediaAdapter = createEntityAdapter<MediaItem>({
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
      .addMatcher(triggerUploadMedia.matchFulfilled, (media, { payload: fetchedMedia }) => {
        mediaAdapter.addOne(media, fetchedMedia)
      })
      .addMatcher(triggerTrashMedia.matchPending, (media, action) => {
        const trashedMedia = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          trashedMedia.map((id) => ({ id, changes: { trashed: true, isAssociable: false } })),
        )
      })
      .addMatcher(triggerRestoreMedia.matchPending, (media, action) => {
        const restoredMedia = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          restoredMedia.map((id) => ({ id, changes: { trashed: false, isAssociable: true } })),
        )
      })
  },
})

export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)
export const mediaStatusDictionarySelector = createSelector(mediaSelector.selectAll, getMediaGroupedByFilter)
export const mediasFilteredByUrlSelector = createSelector(
  [mediaSelector.selectAll, (_: State, search: string) => search],
  getFilteredMedia,
)

const initialMediaDisplay = {
  selectedMediaIds: [] as string[],
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 230,
  transparency: false,
  cardHeader: false,
  badges: false,
  lightBoxMediaId: "none",
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
