import debounce from "debounce"

import { DataLayer, DispatchAction } from "./types"

export const getElementById = (id: string): HTMLElement => document.getElementById(id) ?? document.createElement("div")

export const getScrollHeight = () => {
  const { clientHeight } = getElementById("grid").children[0] ?? document.createElement("div")
  return clientHeight
}

export const setHeight = (totalHeight: number): number => {
  const gridHtmlElement = getElementById("grid-container")
  const head = gridHtmlElement.offsetTop ?? 0
  const parentBorder = gridHtmlElement.parentElement?.clientTop ?? 0
  return totalHeight - head - parentBorder
}

export const setCellMatrix = (
  updateCellMatrix: DispatchAction<DataLayer>,
  updateScrollHeight: any,
  contentSize: number,
): void => {
  const element = getElementById("grid")

  const columnCount = Math.floor((element?.offsetWidth - 15) / contentSize)
  const cellSize = (element?.offsetWidth - 15) / columnCount

  updateCellMatrix({
    columnCount,
    cellSize,
  })

  const children2 = getElementById("grid").children[0] ?? document.createElement("div")

  updateScrollHeight(children2.clientHeight)
}

export const _setCellMatrix = debounce(setCellMatrix, 250)
