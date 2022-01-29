import { ColorBadges, UserStars } from "../../../../types"

export type SelectionAction = {
  mediaId: string
  isShiftKey: boolean
  displayedMediaIds: string[]
}

export type UpdateUserBadgesAction = {
  mediaId: string
  badgeType: "color" | "stars"
  value: ColorBadges | UserStars
  search: string
}
