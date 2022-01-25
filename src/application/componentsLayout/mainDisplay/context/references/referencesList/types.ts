import { MediaItem, ReferenceItem } from "../../../../../types"

export type ReferenceListProps = {
  referencesLoaded: boolean
  references: ReferenceItem[]
  contentSize: number
  headerCellRatio: number
  selectedReferenceIds: string[]
  selectionHandler: (mediaId: string) => (e: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediaId: string) => MediaItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
}
