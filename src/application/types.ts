export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export enum QualityStatus {
  High = "OK",
  Medium = "NO_ZOOM",
  Low = "KO",
  Manual = "TO_BE_CHECKED",
}

export enum ControlStatus {
  Pending = "pending",
  Validated = "validated",
}

export type RawMedium = {
  id: string
  fileName: string
  metadata: { width: number; height: number }
  computedQualityControl: QualityStatus
  dmapId: string
  trashed: boolean
}

export type MediumItem = {
  id: string
  fileName: string
  width: number
  height: number
  status: QualityStatus
  controlId?: string
  trashed: boolean
}

export enum MediaDisplayEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetContextByLabel = "getContextByLabel",
  PostDownloadMedia = "postDownloadMedia",
}

export enum NeutralState {
  NoError = "no error to handle",
}
