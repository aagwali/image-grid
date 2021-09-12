import { parse } from "query-string"
import { any, groupBy, isEmpty, isNil, prop } from "rambda"

import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../storeConfig"
import {
  getContextByLabel,
  getMediaByContextLabel,
  triggerRestoreMedia,
  triggerTrashMedia,
  triggerUploadMedia,
} from "./services"
import { Context, ControlStatus, MediumItem } from "./types"

//#region CONTEXT

export const initialContext: Context = {
  id: "initial value",
  label: "initial value",
}

export const contextSlice = createSlice({
  name: "context",
  initialState: initialContext,
  reducers: { resetContext: () => initialContext },
  extraReducers: (builder) =>
    builder.addMatcher(getContextByLabel.matchFulfilled, (_, { payload: fetchedContext }) => fetchedContext),
})
//#endregion

//#region MEDIA
const mediaAdapter = createEntityAdapter<MediumItem>({
  sortComparer: (a, b) => a.fileName.localeCompare(b.fileName),
})

export const mediaSelector = mediaAdapter.getSelectors((state: State) => state.media)

const mediaSelectedSelector = createSelector(
  [prop("mediaDisplay"), (state: State) => (id: string) => mediaSelector.selectById(state, id)], // curried
  ({ selectedMediaIds }, selectMediaById) => selectedMediaIds.map(selectMediaById),
)

export const mediaGroupedByFilters = createSelector(mediaSelector.selectAll, (media) => {
  const mediaGroupedByStatus = groupBy(prop("status"), media)
  const mediaGroupedByControlStatus = groupBy(
    (medium) => (isNil(medium.controlId) ? ControlStatus.Pending : ControlStatus.Validated),
    media,
  )
  return { ...mediaGroupedByStatus, ...mediaGroupedByControlStatus }
})

export const mediaFilteredSelector = createSelector(
  [mediaSelector.selectAll, (_: State, search: string) => search],
  (media, search) => {
    const queryObjectParameters = parse(search, { arrayFormat: "separator", arrayFormatSeparator: "|" })

    const rawStatusFilters = queryObjectParameters.status ?? []
    const statusFilters = Array.isArray(rawStatusFilters) ? rawStatusFilters : [rawStatusFilters]

    const controlFilter = queryObjectParameters.control as string | null

    const rawTextFilter = queryObjectParameters.textFilter ?? []
    const textFilters = Array.isArray(rawTextFilter) ? rawTextFilter : [rawTextFilter]

    const binDisplay = queryObjectParameters.bin

    const filteredMedia = media.filter((medium) => {
      const binFilterKeep = binDisplay ? medium.trashed : !medium.trashed

      const textFilterKeep = isEmpty(textFilters)
        ? true
        : any(
            (textFilter) => medium.fileName.includes(textFilter),
            textFilters.filter((x) => x !== ""),
          )

      const statusFilterKeep = isEmpty(statusFilters) ? true : statusFilters.includes(medium.status)
      const controlFilterKeep = !controlFilter
        ? true
        : controlFilter === ControlStatus.Validated
        ? !isNil(medium.controlId)
        : isNil(medium.controlId)

      return binFilterKeep && controlFilterKeep && statusFilterKeep && textFilterKeep
    })

    return filteredMedia
  },
)

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
        const optimisticTrashedMedium = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          optimisticTrashedMedium.map((id) => ({ id, changes: { trashed: true, isAssociable: false } })),
        )
      })
      .addMatcher(triggerRestoreMedia.matchPending, (media, action) => {
        const optimisticRestoredMedium = action.meta.arg.originalArgs
        mediaAdapter.updateMany(
          media,
          optimisticRestoredMedium.map((id) => ({ id, changes: { trashed: false, isAssociable: true } })),
        )
      })
  },
})

//#endregion

//#region MEDIA GRID
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
