import { Dispatch } from "react"
import { toast } from "react-toastify"

import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

import { Url } from "./components/navigateSetter"
import { toastOptions } from "./privates"
import { ExitType, MediashareEndpoints, RejectedApiRequestMeta } from "./types"

const switchIsExhaustive = (_: never) =>
  "Placed as default case, argument raises a ts(2345) error for every missing case"

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

  const endpoints = requestMeta.arg.endpointName

  switch (endpoints) {
    case MediashareEndpoints.GetContextByLabel:
      description = "Unable to get context"
      displayExit(ExitType.Error, description)
      break
    case MediashareEndpoints.GetMediaByContextLabel:
      description = "Unable to get medias"
      displayExit(ExitType.Warning, description)
      break
    case MediashareEndpoints.GetReferencesByContextLabel:
      description = "Unable to get references"
      displayExit(ExitType.Warning, description)
      break
    case MediashareEndpoints.PutInTrash:
      description = "Move to bin failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break
    case MediashareEndpoints.RestoreFromTrash:
      description = "Restore failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break
    case MediashareEndpoints.Upload:
      description =
        requestMeta.baseQueryMeta.response.status === 409
          ? `Upload failed - File name already exists : ${requestMeta.arg.originalArgs.fileName}`
          : `Upload failed : ${requestMeta.arg.originalArgs.fileName}`
      displayExit(ExitType.Warning, description)
      break
    case MediashareEndpoints.PatchReference:
      description = "Reference update failed. Reverting Changes."
      displayExit(ExitType.Warning, description)
      break

    default:
      switchIsExhaustive(endpoints)
  }
}

export const apiErrorsMiddleware: Middleware =
  (_api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: any) => {
    if (isRejectedWithValue(action)) handleFailedQueries(action.meta)
    return next(action)
  }
