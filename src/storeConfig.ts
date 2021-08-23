import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

import { authSlice, contextSlice, errorSlice, mediaGridDisplaySlice, mediaSlice } from "./application/reducers"
import { mediashareApi } from "./application/services"

const rootReducer = {
  [errorSlice.name]: errorSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [mediaGridDisplaySlice.name]: mediaGridDisplaySlice.reducer,
  [mediaSlice.name]: mediaSlice.reducer,
  // [mediaSelectedSlice.name]: mediaSelectedSlice.reducer,
  [contextSlice.name]: contextSlice.reducer,
  [mediashareApi.reducerPath]: mediashareApi.reducer,
}

const handleApiErrors: Middleware = (_api: MiddlewareAPI) => (next: any) => async (action: any) => {
  if (isRejectedWithValue(action)) {
    next(
      errorSlice.actions.setErrorAction({
        type: action.meta.arg.endpointName,
        payload: action.payload,
      }),
    )
  }
  return next(action)
}

const configureAppStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefault: any) => getDefault().concat(mediashareApi.middleware).concat(handleApiErrors),
    devTools: false, // low performances at true
  })

export const store = configureAppStore()

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector
