import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../../../../../storeConfig"
import { MediaDisplay, MediaItem } from "../../../../types"
import { contextSlice } from "../reducers"
import { getContextByLabel } from "../services"
import {
  getFilteredMedia,
  getMediaGroupedByFilter,
  getSelectionBadges,
  setCompleteSelection,
  setMultipleBadges,
} from "./privates"
import { getMediaByContextLabel, triggerRestoreMedia, triggerTrashMedia, triggerUploadMedia } from "./services"
import { SetCompleteSelectionAction, UpdateSelectionAction, UpdateUserBadgesAction } from "./types"

//#region Medias

const mediaAdapter = createEntityAdapter<MediaItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})

//#region Selectors

export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)

export const mediaStatusDictionarySelector = createSelector(
  [mediaSelector.selectAll, ({ mediasDisplay }: State) => mediasDisplay.userBadges],
  getMediaGroupedByFilter,
)

export const mediasFilteredByUrlSelector = createSelector(
  [
    mediaSelector.selectAll,
    ({ mediasDisplay: { userBadges } }: State, search: string) => ({
      userBadges,
      search,
    }),
  ],
  getFilteredMedia,
)

//#endregion

export const mediaSlice = createSlice({
  name: "media",
  initialState: mediaAdapter.getInitialState({ loaded: false }),
  reducers: {},
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
//#endregion

//#region Media display

const initialMediaDisplay: MediaDisplay = {
  contentSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 230,
  transparency: false,
  cardHeader: false,
  badges: false,
  lightBoxMediaId: "none",
  scrollRatio: 0,
  whiteReplacement: false,
  lastFilter: "",
  lastSelectedMediaId: "",
  uploadProgress: 0,
  cellMatrix: {
    columnCount: 10,
    cellSize: Number(process.env.GRID_ITEM_DEFAULT_SIZE) || 230,
  },
  userBadges: {},
}

export const mediasDisplaySlice = createSlice({
  name: "mediasDisplay",
  initialState: initialMediaDisplay,
  reducers: {
    updateMediaDisplay: (
      mediasDisplay,
      { payload: anyMediaDisplayProps }: PayloadAction<Partial<typeof mediasDisplay>>,
    ) => ({
      ...mediasDisplay,
      ...anyMediaDisplayProps,
    }),
    updateUserBadges: (
      mediasDisplay,
      { payload: { mediaId, badgeType, value } }: PayloadAction<UpdateUserBadgesAction>,
    ) => ({
      ...mediasDisplay,
      userBadges: setMultipleBadges(mediaId, badgeType, value, mediasDisplay.lastFilter, mediasDisplay.userBadges),
    }),
    updateUserBadgesSelection: (
      mediasDisplay,
      { payload: { mediaIds, isShiftKey, displayedMediaIds } }: PayloadAction<UpdateSelectionAction>,
    ) => ({
      ...mediasDisplay,
      ...getSelectionBadges(
        mediaIds,
        isShiftKey,
        displayedMediaIds,
        mediasDisplay.lastSelectedMediaId,
        mediasDisplay.userBadges,
      ),
    }),
    updateUserBadgesCompleteSelection: (
      mediasDisplay,
      { payload: { selectionType, displayedMediaIds } }: PayloadAction<SetCompleteSelectionAction>,
    ) => ({
      ...mediasDisplay,
      userBadges: setCompleteSelection(selectionType, displayedMediaIds, mediasDisplay.userBadges),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.resetContext, (mediasDisplay) => ({
      ...initialMediaDisplay,
      uploadProgress: mediasDisplay.uploadProgress,
    }))
  },
})

//#endregion
