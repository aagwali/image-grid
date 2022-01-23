import React from "react"

import { MediumItem } from "../../../../types"

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
  filteredMedia: MediumItem[]
  headerCellRatio: number
  transparency: boolean
  selectedMediaIds: string[]
  whiteReplacement: boolean
  openLightBox: (mediumId: string) => (e: MouseEvent) => void
  selectionHandler: (mediumId: string) => (e: MouseEvent) => any
  headerRatio: number
  badges: boolean
  forceUpdate: React.DispatchWithoutAction
}
