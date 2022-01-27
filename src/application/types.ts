export enum ExitType {
  Warning = "warning",
  Error = "error",
}

export enum QualityStatus {
  High = "OK",
  Media = "NO_ZOOM",
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

export type RawMedia = {
  id: string
  fileName: string
  metadata: { width: number; height: number }
  computedQualityControl: QualityStatus
  dmapId: string
  trashed: boolean
  isAssociable: boolean
}

export enum UserStars {
  None = "",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
}

export enum ColorBadges {
  Grey = "grey",
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
}

export type UserBadges = {
  color?: ColorBadges
  stars?: UserStars
}

export type MediaItem = {
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
  id: string
  familyId: number
  mediaAssociations: {
    msMediaId: string
    slot: number
  }[]
  mode: number
}

export type ReferenceItem = {
  id: string
  familyId: string
  mediaAssociations: {
    msMediaId: string
    slot: number
  }[]
}

export type AssociationItem = {
  id: string
  mediaChildren: MediaItem[] & { slot: number }
}

export enum MediashareEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
  GetReferencesByContextLabel = "getReferencesByContextLabel",
  GetContextByLabel = "getContextByLabel",
  PutInTrash = "putInTrash",
  RestoreFromTrash = "restore",
  Upload = "upload",
  PatchReference = "patchReference",
}

export type RejectedApiRequestMeta = {
  arg: {
    originalArgs: any
    endpointName: MediashareEndpoints
  }
  baseQueryMeta: { response: { status: number } }
}

export type PaginatedResponse<T> = {
  items: T[]
  total_pages: number
  current_page: number
}
