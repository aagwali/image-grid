import { Draft } from "@reduxjs/toolkit"

export type SetStateCellMatrix = React.Dispatch<
  React.SetStateAction<{
    columnCount: number
    cellSize: number
  }>
>

export interface DynamicGridProps {
  transparency: boolean
  toggleTransparency: () => { payload: Partial<Draft<any>>; type: string }
  contentSize: number
  contentSizeRange: [number, number]
  updateContentSize: any
  scrollRatio: any
  updateScrollRatio: any
  items: any
  renderItem: any
}

export interface SizeSliderProps {
  contentSize: number
  updateContentSize: (n: number) => void
  sliderStepCount: number
  contentSizeRange: [number, number]
  setCellMatrix: any
}
