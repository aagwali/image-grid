export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export enum QualityStatus {
  High = "OK",
  Medium = "NO_ZOOM",
  Low = "KO",
  Manual = "A_VERIFIER",
}

export type RawMedium = {
  id: string
  fileName: string
  metadata: { width: number; height: number }
  computedQualityControl: QualityStatus
  dmapId: string
}

export type MediumItem = {
  id: string
  fileName: string
  width: number
  height: number
  status: QualityStatus
  controlId?: string
}

export enum MediaDisplayEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetContextByLabel = "getContextByLabel",
  PostDownloadMedia = "ffffffffffffffff",
}

export enum NeutralState {
  NoError = "no error to handle",
}
