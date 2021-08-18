export interface ApplicationProps {
  authenticated: boolean
}

export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export type RawMedium = {
  id: string
  mediaUid: string
}

export type MediumItem = {
  id: string
  mediaUid: string
}

export enum MediaGridEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
}

export enum NeutralState {
  NoError = "no error to handle",
}

export type ApiEndpoints = NeutralState | MediaGridEndpoints

export type ErrorAction = {
  type: string
  payload: { type: ApiEndpoints; payload: any }
}
