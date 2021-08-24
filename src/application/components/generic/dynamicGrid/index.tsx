import debounce from "debounce"
import { splitEvery } from "rambda"
import React from "react"
import { AutoSizer, Grid, WindowScroller } from "react-virtualized"

import { Center } from "@chakra-ui/react"

import { setCellMatrix_, setHeight, setScrollRatio_, updateScrollTop } from "./privates"
import { DynamicGridProps } from "./types"

export const cellRenderer =
  (dataLayer: any[][], renderItem: any) =>
  ({ rowIndex, columnIndex, key, style }: any) =>
    dataLayer[rowIndex][columnIndex] ? (
      <Center key={key} style={style}>
        {renderItem(dataLayer[rowIndex][columnIndex])}
      </Center>
    ) : (
      <Center key={key} style={style} />
    )

const DynamicGrid = ({
  contentSize,
  scrollRatio,
  updateScrollRatio,
  cellMatrix,
  updateCellMatrix,
  items,
  renderItem,
  forceUpdate,
}: DynamicGridProps) => {
  const { cellSize, columnCount } = cellMatrix

  const dataLayer = splitEvery(columnCount, items)

  const _setCellMatrix_ = setCellMatrix_(updateCellMatrix, forceUpdate) // (contentSize)

  return (
    <div id="grid-container">
      <WindowScroller key={"WindowScroller"}>
        {({ height }) => (
          <AutoSizer disableHeight onResize={() => debounce(_setCellMatrix_, 250)(contentSize)}>
            {({ width }) => (
              <Grid
                id="grid"
                width={width}
                columnWidth={cellSize}
                rowHeight={cellSize}
                rowCount={dataLayer.length}
                columnCount={columnCount}
                overscanRowCount={2}
                style={{ overflowX: "hidden", overflowY: "scroll" }}
                height={setHeight(height)}
                onScroll={setScrollRatio_(updateScrollRatio)}
                scrollTop={updateScrollTop(scrollRatio)}
                cellRenderer={cellRenderer(dataLayer, renderItem)}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

export default DynamicGrid
