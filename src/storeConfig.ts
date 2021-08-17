import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

import { authSlice, baseMsApi, displaySlice, errorSlice } from "./application/reducers"

const rootReducer = {
  [errorSlice.name]: errorSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [displaySlice.name]: displaySlice.reducer,
  [baseMsApi.reducerPath]: baseMsApi.reducer,
}

/*
  Middleware catching any api action failure
  Set a "errorAction" store key with failed action object
  Application component is plugged on store key to handle behavior
*/
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

/* 
"configureStore" from @reduxjs/toolkit :
- Combine reducers is applied on root reducer
- Store has redux-thunk added and the Redux DevTools Extension is turned on
*/
const configureAppStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefault: any) => getDefault().concat(baseMsApi.middleware).concat(handleApiErrors),
  })

export const store = configureAppStore()

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector
