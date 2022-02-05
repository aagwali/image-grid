import React from "react"

import { ColorBadges, MediaItem, UserBadges, UserStars } from "../../../../../types"

export type MediaGridProps = {
  isBin: boolean
  mediaLoaded: boolean
  contentSize: number
  scrollRatio: number
  updateCellMatrix: React.Dispatch<any>
  updateScrollRatio: React.Dispatch<any>
  cellMatrix: {
    columnCount: number
    cellSize: number
  }
  filteredMedia: MediaItem[]
  headerCellRatio: number
  transparency: boolean
  selectedMediaIds: string[]
  whiteReplacement: boolean
  headerRatio: number
  badges: boolean
  userBadges: UserBadges
  forceUpdate: React.DispatchWithoutAction
  openLightBox: (mediaId: string) => (mouseEvent: MouseEvent) => void
  setSelection: (mediaId: string) => (mouseEvent: MouseEvent) => any
  setUserBadge: (
    mediaId: string,
    badgeType: "stars" | "color",
    value: ColorBadges | UserStars,
  ) => (mouseEvent: MouseEvent) => void
}
