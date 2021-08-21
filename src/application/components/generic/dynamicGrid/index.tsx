import { splitEvery } from "rambda"
import React, { useState } from "react"
import { AutoSizer, Grid, WindowScroller } from "react-virtualized"

import { Box, Center, Checkbox } from "@chakra-ui/react"

import { _setCellMatrix, getScrollHeight, setHeight } from "./privates"
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
  items,
  contentSize,
  renderItem,
  transparency,
  toggleTransparency,
  updateContentSize,
  contentSizeRange,
}: DynamicGridProps) => {
  const [scrollHeight, updateScrollHeight] = useState(0)
  const [scrollRatio, updateScrollRatio] = useState(0)
  const [{ cellSize, columnCount }, updateCellMatrix] = useState({
    cellSize: contentSize,
    columnCount: 1,
  })

  const dataLayer = splitEvery(columnCount, items)

  return (
    <GridBox>
      <SettingsBox>
        <SizeSlider
          sliderStepCount={10}
          contentSize={contentSize}
          contentSizeRange={contentSizeRange}
          updateContentSize={updateContentSize}
          updateCellMatrix={updateCellMatrix}
          updateScrollHeight={updateScrollHeight}
        />
        <Checkbox children="Transparency" colorScheme="teal" isChecked={transparency} onChange={toggleTransparency} />
      </SettingsBox>
      <ItemsBox>
        <Box id="grid-container">
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
                    cellRenderer={cellRenderer(dataLayer, renderItem)}
                    width={width}
                    columnWidth={cellSize}
                    rowHeight={cellSize}
                    columnCount={columnCount}
                    rowCount={dataLayer.length}
                    overscanRowCount={2}
                    style={{ overflowX: "hidden", overflowY: "scroll" }}
                    scrollTop={scrollRatio * scrollHeight}
                    height={setHeight(height)}
                    onScroll={({ scrollTop }) => {
                      const clientHeight = scrollHeight === 0 ? getScrollHeight() : scrollHeight
                      const newScrollRatio = clientHeight === 0 ? 0 : scrollTop / clientHeight
                      updateScrollRatio(newScrollRatio)
                      updateScrollHeight(clientHeight)
                    }}
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
