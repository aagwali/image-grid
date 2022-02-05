import { MediaItem, ReferenceItem, UserBadges } from "../../../../../types"

export type ReferenceListProps = {
  referencesLoaded: boolean
  references: ReferenceItem[]
  contentSize: number
  headerCellRatio: number
  selectedReferenceIds: string[]
  setSelection: (mediaId: string) => (mouseEvent: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediaId: string) => MediaItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
  userBadges: UserBadges
}
