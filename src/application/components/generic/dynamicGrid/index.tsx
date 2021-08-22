import debounce from "debounce"
import { add, splitEvery } from "rambda"
import React, { useReducer, useState } from "react"
import { AutoSizer, Grid, WindowScroller } from "react-virtualized"

import { Box, Center, Checkbox } from "@chakra-ui/react"

import { setCellMatrix_, setHeight, setScrollRatio_, updateScrollTop } from "./privates"
import SizeSlider from "./sizeSlider"
import { GridBox, ItemsBox, SettingsBox } from "./stlyes"
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
  transparency,
  toggleTransparency,
  contentSize,
  contentSizeRange,
  updateContentSize,
  scrollRatio,
  updateScrollRatio,
  items,
  renderItem,
}: DynamicGridProps) => {
  const [_, forceUpdate] = useReducer(add(1), 0)

  const [{ cellSize, columnCount }, updateCellMatrix] = useState({
    cellSize: contentSize,
    columnCount: 1,
  })

  const dataLayer = splitEvery(columnCount, items)

  const _setCellMatrix_ = setCellMatrix_(updateCellMatrix, forceUpdate) // (contentSize)

  return (
    <GridBox>
      <SettingsBox>
        <SizeSlider
          sliderStepCount={10}
          contentSize={contentSize}
          contentSizeRange={contentSizeRange}
          updateContentSize={updateContentSize}
          setCellMatrix={_setCellMatrix_}
        />
        <Checkbox children="Transparency" colorScheme="teal" isChecked={transparency} onChange={toggleTransparency} />
      </SettingsBox>
      <ItemsBox>
        <Box id="grid-container">
          <WindowScroller key={"WindowScroller"}>
            {({ height }) => (
              <AutoSizer disableHeight onResize={() => debounce(_setCellMatrix_, 250)(contentSize)}>
                {({ width }) => (
                  <Grid
                    id="grid"
                    cellRenderer={cellRenderer(dataLayer, renderItem)}
                    width={width}
                    columnWidth={cellSize}
                    rowHeight={cellSize}
                    columnCount={columnCount}
                    rowCount={dataLayer.length}
                    overscanRowCount={2}
                    style={{ overflowX: "hidden", overflowY: "scroll" }}
                    scrollTop={updateScrollTop(scrollRatio)}
                    height={setHeight(height)}
                    onScroll={setScrollRatio_(updateScrollRatio)}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </Box>
      </ItemsBox>
    </GridBox>
  )
}

export default DynamicGrid
