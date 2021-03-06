import debounce from "debounce"
import { isEmpty, splitEvery } from "rambda"
import React from "react"
import { AutoSizer, Grid, WindowScroller } from "react-virtualized"

import { Center } from "@chakra-ui/react"

import { setCellMatrix_, setHeight, setScrollRatio_, updateScrollTop } from "./privates"
import { TextPlaceholder } from "./styles"
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
  itemsLoaded,
  renderItem,
  forceUpdate,
  headerHeightRatio = 1,
}: DynamicGridProps) => {
  const { cellSize, columnCount } = cellMatrix

  const dataLayer = splitEvery(columnCount, items)

  const _setCellMatrix_ = setCellMatrix_(updateCellMatrix, forceUpdate) // (contentSize)

  const anyItems = !isEmpty(items)

  return (
    <div id="grid-container">
      <WindowScroller key={"WindowScroller"}>
        {({ height }) => (
          <AutoSizer disableHeight onResize={() => debounce(_setCellMatrix_, 250)(contentSize)}>
            {({ width }) =>
              !itemsLoaded && anyItems ? (
                <Center h={setHeight(height)} w={width} />
              ) : itemsLoaded && !anyItems ? (
                <Center h={setHeight(height)} w={width}>
                  <TextPlaceholder children={"No items to display"} />
                </Center>
              ) : (
                <Grid
                  id="grid"
                  width={width}
                  columnWidth={cellSize}
                  rowHeight={cellSize * headerHeightRatio}
                  rowCount={dataLayer.length}
                  columnCount={columnCount}
                  overscanRowCount={2}
                  style={{ overflowX: "hidden", overflowY: "scroll" }}
                  height={setHeight(height)}
                  onScroll={setScrollRatio_(updateScrollRatio)}
                  scrollTop={updateScrollTop(scrollRatio)}
                  cellRenderer={cellRenderer(dataLayer, renderItem)}
                />
              )
            }
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

export default DynamicGrid
