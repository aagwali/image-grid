import { toast, ToastOptions } from "react-toastify"

import { navigate } from "@reach/router"

import { useAppDispatch } from "../../../../../storeConfig"
import { errorSlice } from "../../../../reducers"
import { ErrorAction, ExitType, MediaGridEndpoints, NeutralState } from "../../../../types"

const toastOptions: ToastOptions = {
  position: "bottom-center",
}

const displayExit = (status: ExitType, description: string, dispatch: any) => {
  if (status === ExitType.Warning) {
    toast.warn(description, toastOptions)
  }

  if (status === ExitType.Error) {
    toast.error(description, toastOptions)
    navigate("/home")
  }

  dispatch(
    errorSlice.actions.setErrorAction({
      type: NeutralState.NoError,
      payload: {},
    }),
  )
}

export const handleFailedQueries = (errorAction: ErrorAction) => {
  const dispatch = useAppDispatch()

  let description = ""

  switch (errorAction.payload.type) {
    case NeutralState.NoError:
      break

    case MediaGridEndpoints.GetMediaByContextLabel:
      description = "Unable to get medias"
      displayExit(ExitType.Warning, description, dispatch)
      break

    default: {
      ;((_incompleteSwitchCase: never) => "")(errorAction.payload.type)
    }
  }
}
