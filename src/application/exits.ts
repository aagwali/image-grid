import { Dispatch } from "react"
import { toast } from "react-toastify"

import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

import { Url } from "./components/navigateSetter"
import { toastOptions } from "./privates"
import { ContextEndpoints, ExitType, RejectedApiRequestMeta } from "./types"

const displayExit = (status: ExitType, description: string): void => {
  if (status === ExitType.Warning) {
    toast.warn(description, toastOptions)
  }

  if (status === ExitType.Error) {
    Url.navigate("/")
    toast.error(description, toastOptions)
  }
}

const handleFailedQueries = (requestMeta: RejectedApiRequestMeta): void => {
  let description = ""

  switch (requestMeta.arg.endpointName) {
    case ContextEndpoints.GetContextByLabel:
      description = "Unable to get context"
      displayExit(ExitType.Error, description)
      break
    case ContextEndpoints.GetMediaByContextLabel:
      description = "Unable to get medias"
      displayExit(ExitType.Warning, description)
      break
    case ContextEndpoints.GetReferencesByContextLabel:
      description = "Unable to get references"
      displayExit(ExitType.Warning, description)
      break
    case ContextEndpoints.PutInTrash:
      description = "Move to bin failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break
    case ContextEndpoints.RestoreFromTrash:
      description = "Restore failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break
    case ContextEndpoints.Upload:
      description =
        requestMeta.baseQueryMeta.response.status === 409
          ? `Upload failed - File name already exists : ${requestMeta.arg.originalArgs.fileName}`
          : `Upload failed : ${requestMeta.arg.originalArgs.fileName}`
      displayExit(ExitType.Warning, description)
      break
    case ContextEndpoints.PatchReference:
      description = "Reference update failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break

    default: {
      ;((_incompleteSwitchCase: never) => "")(requestMeta.arg.endpointName)
    }
  }
}

export const apiErrorsMiddleware: Middleware =
  (_api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: any) => {
    if (isRejectedWithValue(action)) handleFailedQueries(action.meta)
    return next(action)
  }
