import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"

import { mediasDisplaySlice, mediaSlice } from "./application/components/_layout/mainDisplay/context/medias/reducers"
import { contextSlice } from "./application/components/_layout/mainDisplay/context/reducers"
import {
  referencesDisplaySlice,
  referencesSlice,
} from "./application/components/_layout/mainDisplay/context/references/reducers"
import { apiErrorsMiddleware } from "./application/exits"
import { mediashareApi } from "./application/services"

const configureAppStore = () =>
  configureStore({
    reducer: {
      [contextSlice.name]: contextSlice.reducer,
      [mediasDisplaySlice.name]: mediasDisplaySlice.reducer,
      [referencesDisplaySlice.name]: referencesDisplaySlice.reducer,
      [mediaSlice.name]: mediaSlice.reducer,
      [referencesSlice.name]: referencesSlice.reducer,
      [mediashareApi.reducerPath]: mediashareApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(mediashareApi.middleware).concat(apiErrorsMiddleware),
    devTools: false, // true : low performances with large store
  })

export const store = configureAppStore()

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector
