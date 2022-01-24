import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { State } from "../../../../../storeConfig"
import { rawToReferenceItem } from "../../../../privates"
import { getReferencesByContextLabel, triggerPatchReference } from "../../../../services"
import { ReferenceItem } from "../../../../types"

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

const initialReferencesDisplay = {
  contentSize: Number(process.env.REF_ITEM_DEFAULT_SIZE) || 100,
  selectedReferenceIds: [] as string[],
  lightBoxMediumId: "none", // how to not connect to media display
  scrollRatio: 0,
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
