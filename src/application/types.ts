export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export type RawMedium = {
  id: string
  mediaUid: string
  fileName: string
  metadata: { width: number; height: number }
}

export type MediumItem = {
  id: string
  mediaUid: string
  fileName: string
  width: number
  height: number
}

export enum MediaGridEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetContextByLabel = "getContextByLabel",
}

export enum NeutralState {
  NoError = "no error to handle",
}
