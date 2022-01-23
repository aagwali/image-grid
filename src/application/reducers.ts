import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../storeConfig"
import { getFilteredMedia, getMediaGroupedByFilter, rawToReferenceItem } from "./privates"
import {
  getContextByLabel,
  getMediaByContextLabel,
  getReferencesByContextLabel,
  triggerPatchReference,
  triggerRestoreMedia,
  triggerTrashMedia,
  triggerUploadMedia,
} from "./services"
import { Context, MediumItem, ReferenceItem } from "./types"

//#region CONTEXT
export const initialContext: Context = {
  id: "",
  label: "",
}

export const contextSlice = createSlice({
  name: "context",
  initialState: initialContext,
  reducers: { resetContext: (context, { payload: label }) => ({ id: initialContext.id, label }) },
  extraReducers: (builder) =>
    builder.addMatcher(getContextByLabel.matchFulfilled, (_, { payload: fetchedContext }) => fetchedContext),
})
//#endregion

//#region MEDIA
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

//#region MEDIA DISPLAY
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
  name: "mediaDisplay",
  initialState: initialMediaDisplay,
  reducers: {
    updateMediaDisplay: (mediaDisplay, { payload }: PayloadAction<Partial<typeof mediaDisplay>>) => ({
      ...mediaDisplay,
      ...payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(contextSlice.actions.resetContext, (mediaDisplay) => ({
      ...initialMediaDisplay,
      uploadProgress: mediaDisplay.uploadProgress,
    }))
  },
})
//#endregion

//#endregion

//#region REFERENCES

const referencesAdapter = createEntityAdapter<ReferenceItem>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})

export const referencesSlice = createSlice({
  name: "references",
  initialState: referencesAdapter.getInitialState({ loaded: false }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getReferencesByContextLabel.matchFulfilled, (references, { payload: fetchedReferences }) => {
      referencesAdapter.removeAll(references)
      referencesAdapter.setAll(references, fetchedReferences)
      references.loaded = true
    })
    builder.addMatcher(triggerPatchReference.matchPending, (references, action) => {
      const patch = action.meta.arg.originalArgs
      referencesAdapter.updateMany(
        references,
        patch.referenceIds.map((id) => ({ id, changes: rawToReferenceItem(patch.value) })),
      )
    })
  },
})

export const referencesSelector = referencesAdapter.getSelectors((state: State) => state.references)

//#region REFERENCES DISPLAY
const initialReferencesDisplay = {
  contentSize: Number(process.env.REF_ITEM_DEFAULT_SIZE) || 100,
  selectedReferenceIds: [] as string[],
  mediaTransparency: false,
  mediaCardHeader: false,
  mediaBadges: false,
  lightBoxMediumId: "none", // how to not connect to media display
  scrollRatio: 0,
  mediaWhiteReplacement: false,
  lastFilter: "",
}

export const referencesDisplaySlice = createSlice({
  name: "referencesDisplay",
  initialState: initialReferencesDisplay,
  reducers: {
    updateReferencesDisplay: (referencesDisplay, { payload }: PayloadAction<Partial<typeof referencesDisplay>>) => ({
      ...referencesDisplay,
      ...payload,
    }),
  },
})
//#endregion

//#endregion
