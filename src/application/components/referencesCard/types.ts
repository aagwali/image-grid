import { MediaItem, ReferenceItem, UserBadges } from "../../types"

export type ReferenceCardProps = {
  reference: ReferenceItem
  contentSize: number
  selectedReferenceIds: string[]
  setSelection: (mediaId: string) => (mouseEvent: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediaId: string) => MediaItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
  userBadges: Record<string, UserBadges>
}
