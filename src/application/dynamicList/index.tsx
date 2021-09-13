import debounce from "debounce"
import { isEmpty } from "rambda"
import React from "react"
import { AutoSizer, List, WindowScroller } from "react-virtualized"

import { Center } from "@chakra-ui/react"

import { setHeight } from "./privates"
import { TextPlaceholder } from "./styles"
import { DynamicListProps } from "./types"

const rowRenderer =
  (list: any[], renderItem: any) =>
  ({ key, index, style }: any) => {
    return (
      <div key={key} style={style}>
        {renderItem(list[index])}
      </div>
    )
  }

const DynamicList = ({ items, itemsLoaded, renderItem, contentSize, headerHeightRatio = 1 }: DynamicListProps) => {
  const anyItems = !isEmpty(items)

  return (
    <div id="list-container">
      <WindowScroller key={"WindowScroller"}>
        {({ height }) => (
          <AutoSizer disableHeight>
            {({ width }) =>
              !itemsLoaded && anyItems ? (
                <Center h={setHeight(height)} w={width} />
              ) : itemsLoaded && !anyItems ? (
                <Center h={setHeight(height)} w={width}>
                  <TextPlaceholder children={"No items to display"} />
                </Center>
              ) : (
                <List
                  id="list"
                  width={width}
                  height={setHeight(height)}
                  rowCount={items.length}
                  rowHeight={contentSize * headerHeightRatio}
                  rowRenderer={rowRenderer(items, renderItem)}
                />
              )
            }
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

export default DynamicList
