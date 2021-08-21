export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export type RawMedium = {
  id: string
  mediaUid: string
  fileName: string
}

export type MediumItem = {
  id: string
  mediaUid: string
  fileName: string
  checked: boolean
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
