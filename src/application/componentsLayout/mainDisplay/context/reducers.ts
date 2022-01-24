import { createSlice } from "@reduxjs/toolkit"

import { getContextByLabel } from "../../../services"
import { Context } from "../../../types"

export const initialContext: Context = {
  id: "",
  label: "",
}

export const contextSlice = createSlice({
  name: "context",
  initialState: initialContext,
  reducers: { resetContext: (_, { payload: label }) => ({ id: initialContext.id, label }) },
  extraReducers: (builder) =>
    builder.addMatcher(getContextByLabel.matchFulfilled, (_, { payload: fetchedContext }) => fetchedContext),
})
