import { ColorBadges, UserStars } from "../../../../types"

export type UpdateSelectionAction = {
  mediaIds: string[]
  isShiftKey: boolean
  displayedMediaIds: string[]
}

export type UpdateUserBadgesAction = {
  mediaId: string
  badgeType: "color" | "stars"
  value: ColorBadges | UserStars
}

export type SetCompleteSelectionAction = {
  selectionType: "select" | "deselect"
  displayedMediaIds: string[]
}
