export interface DynamicGridProps {
  contentSize: number
  scrollRatio: number
  updateScrollRatio: (scrollRatio: number) => void
  cellMatrix: { columnCount: number; cellSize: number }
  updateCellMatrix: (cellMatrix: { columnCount: number; cellSize: number }) => void
  items: any[]
  itemsLoaded: boolean
  renderItem: (item: any) => JSX.Element
  forceUpdate: React.DispatchWithoutAction
  headerHeightRatio?: number
}

export interface SizeSliderProps {
  contentSize: number
  updateContentSize: (contentSize: number) => void
  contentSizeRange: [number, number]
  sliderStepCount: number
  updateCellMatrix: (cellMatrix: { columnCount: number; cellSize: number }) => void
  forceUpdate: React.DispatchWithoutAction
}

export enum SizeSliderShortcuts {
  MediumSizeUp = "ctrl+up",
  MediumSizeDown = "ctrl+down",
}
