import { MediaItem, ReferenceItem } from "../../types"

export type ReferenceCardProps = {
  reference: ReferenceItem
  contentSize: number
  selectedReferenceIds: string[]
  selectionHandler: (mediaId: string) => (e: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediaId: string) => MediaItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
}
