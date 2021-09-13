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

export type RawReference = {
  familyId: number
  mediaAssociations: {
    msMediaId: string
    slot: number
  }[]
  mode: number
}

export type PaginatedResponse<T> = {
  items: T[]
  total_pages: number
  current_page: number
}

export type ReferenceItem = {
  id: string
  mediaAssociations: {
    msMediaId: string
    slot: number
  }[]
}

export type AssociationItem = {
  id: string
  mediaChildren: MediumItem[] & { slot: number }
}

export enum ContextEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetReferencesByContextLabel = "getReferencesByContextLabel",
  GetContextByLabel = "getContextByLabel",
  PutInTrash = "putInTrash",
  RestoreFromTrash = "restore",
  Upload = "upload",
}

export type RejectedApiRequestMeta = {
  arg: {
    originalArgs: any
    endpointName: ContextEndpoints
  }
  baseQueryMeta: { response: { status: number } }
}
