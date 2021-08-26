import { Dispatch } from "react"
import { toast, ToastOptions } from "react-toastify"

import { navigate } from "@reach/router"
import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

import { ExitType, MediaGridEndpoints } from "./types"

const toastOptions: ToastOptions = {
  position: "bottom-center",
}

const displayExit = (status: ExitType, description: string): void => {
  if (status === ExitType.Warning) {
    toast.warn(description, toastOptions)
  }

  if (status === ExitType.Error) {
    navigate("/")
    toast.error(description, toastOptions)
  }
}

const handleFailedQueries = (endpointName: MediaGridEndpoints): void => {
  let description = ""

  switch (endpointName) {
    case MediaGridEndpoints.GetContextByLabel:
      description = "Unable to get context"
      displayExit(ExitType.Error, description)
      break
    case MediaGridEndpoints.GetMediaByContextLabel:
      description = "Unable to get medias"
      displayExit(ExitType.Warning, description)
      break

    default: {
      ;((_incompleteSwitchCase: never) => "")(endpointName)
    }
  }
}

export const apiErrorsMiddleware: Middleware =
  (_api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: any) => {
    if (isRejectedWithValue(action)) handleFailedQueries(action.meta.arg.endpointName)
    return next(action)
  }
