export type DataLayer = {
  columnCount: number
  cellSize: number
}

export type DispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

export interface DynamicGridProps {
  cellSize: number
  columnCount: number
  updateCellMatrix: DispatchAction<DataLayer>
  rowCount: number
  contentSize: number
  cellRenderer: ({ rowIndex, columnIndex, key, style }: any) => JSX.Element
  scrollHeight: number
  updateScrollHeight: DispatchAction<number>
  scrollRatio: number
  updateScrollRatio: DispatchAction<number>
}

export interface SizeSliderProps {
  sliderStepCount: number
  contentSize: number
  contentSizeRange: [number, number]
  updateContentSize: (n: number) => void
  updateScrollHeight: DispatchAction<number>
  updateCellMatrix: DispatchAction<DataLayer>
}
