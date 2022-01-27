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
  openLightBox: (mediaId: string) => (e: MouseEvent) => void
  selectionHandler: (mediaId: string) => (e: MouseEvent) => any
  headerRatio: number
  badges: boolean
  userBadges: Record<string, UserBadges>
  forceUpdate: React.DispatchWithoutAction
  setColorBadge: (mediaId: string) => (colorBadge: ColorBadges) => (e: any) => void
  setUserStars: (mediaId: string) => (colorBadge: UserStars) => (e: any) => void
}
