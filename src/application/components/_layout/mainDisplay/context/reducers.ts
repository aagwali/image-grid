import { createSlice } from "@reduxjs/toolkit"

import { Context } from "../../../../types"
import { getContextByLabel } from "./services"

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
