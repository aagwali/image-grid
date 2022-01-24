import { MediumItem, ReferenceItem } from "../../types"

export type ReferenceCardProps = {
  reference: ReferenceItem
  contentSize: number
  selectedReferenceIds: string[]
  selectionHandler: (mediumId: string) => (e: MouseEvent) => any
  bodyCellRatio: number
  getMediaById: (mediumId: string) => MediumItem | undefined
  mediaTransparency: boolean
  mediaWhiteReplacement: boolean
  mediaHeaderRatio: number
  mediaBadges: boolean
}
