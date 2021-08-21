export type DataLayer = {
  columnCount: number
  cellSize: number
}

export type DispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

export interface DynamicGridProps {
  contentSize: number
  items: any
  renderItem: any
  transparency: boolean
  toggleTransparency: any
  updateContentSize: any
  contentSizeRange: [number, number]
}

export interface SizeSliderProps {
  sliderStepCount: number
  contentSize: number
  contentSizeRange: [number, number]
  updateContentSize: (n: number) => void
  updateScrollHeight: DispatchAction<number>
  updateCellMatrix: DispatchAction<DataLayer>
}
