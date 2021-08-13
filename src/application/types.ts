import { MediaGridEndpoints } from "./components/tree/body/mediaGrid/types"

export interface ApplicationProps {
  authenticated: boolean
}

export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export type MediumItem = {
  id: string
  mediaUid: string
}

export enum NeutralState {
  NoError = "no error to handle",
}

export type ApiEndpoints = NeutralState | MediaGridEndpoints

export type ErrorAction = {
  type: string
  payload: { type: ApiEndpoints; payload: any }
}
