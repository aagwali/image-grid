import { MediumItem, ReferenceItem } from "../../../../../types"

export type ReferenceListProps = {
  referencesLoaded: boolean
  references: ReferenceItem[]
  contentSize: number
  headerCellRatio: number
  selectedReferenceIds: string[]
  selectionHandler: (mediumId: string) => (e: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediumId: string) => MediumItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
}
