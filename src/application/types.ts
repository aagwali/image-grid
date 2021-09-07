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

export type RawContext = {
  id: string
  label: string
}

export type Context = {
  id: string
  label: string
}

export type RawMedium = {
  id: string
  fileName: string
  metadata: { width: number; height: number }
  computedQualityControl: QualityStatus
  dmapId: string
  trashed: boolean
  isAssociable: boolean
}

export type MediumItem = {
  id: string
  fileName: string
  width: number
  height: number
  status: QualityStatus
  controlId?: string
  trashed: boolean
  isAssociable: boolean
}

export enum ContextEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetContextByLabel = "getContextByLabel",
  PutInTrash = "putInTrash",
  RestoreFromTrash = "restore",
}

export enum NeutralState {
  NoError = "no error to handle",
}
