import React from "react"
import { AutoSizer, Grid, WindowScroller } from "react-virtualized"

import { _setCellMatrix, getScrollHeight, setHeight } from "./privates"
import { DynamicGridProps } from "./types"

const DynamicGrid = ({
  cellSize,
  updateCellMatrix,
  rowCount,
  columnCount,
  contentSize,
  cellRenderer,
  scrollHeight,
  updateScrollHeight,
  scrollRatio,
  updateScrollRatio,
}: DynamicGridProps) => (
  <div id="grid-container">
    <WindowScroller key={"WindowScroller"}>
      {({ height }) => (
        <AutoSizer
          disableHeight
          onResize={() => {
            _setCellMatrix(updateCellMatrix, updateScrollHeight, contentSize)
          }}
        >
          {({ width }) => (
            <Grid
              id="grid"
              cellRenderer={cellRenderer}
              width={width}
              height={setHeight(height)}
              columnWidth={cellSize}
              rowHeight={cellSize}
              columnCount={columnCount}
              rowCount={rowCount}
              overscanRowCount={2}
              onScroll={({ scrollTop }) => {
                const clientHeight = scrollHeight === 0 ? getScrollHeight() : scrollHeight
                const scrollRatio2 = clientHeight === 0 ? 0 : scrollTop / clientHeight
                updateScrollRatio(scrollRatio2)
                updateScrollHeight(clientHeight)
              }}
              scrollTop={scrollRatio * scrollHeight}
              style={{ overflowX: "hidden", overflowY: "scroll" }}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  </div>
)

export default DynamicGrid
