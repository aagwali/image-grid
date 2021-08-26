import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"

import { apiErrorsMiddleware } from "./application/apiErrors"
import { authSlice, contextSlice, mediaGridDisplaySlice, mediaSlice } from "./application/reducers"
import { mediashareApi } from "./application/services"

const configureAppStore = () =>
  configureStore({
    reducer: {
      [contextSlice.name]: contextSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [mediaGridDisplaySlice.name]: mediaGridDisplaySlice.reducer,
      [mediaSlice.name]: mediaSlice.reducer,
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
