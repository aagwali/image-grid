import { ScrollParams } from "react-virtualized"

export const getElementById = (id: string): HTMLElement => document.getElementById(id) ?? document.createElement("div")
export const getElementFirstChild = (element: HTMLElement): Element =>
  element.children[0] ?? document.createElement("div")

export const setHeight = (totalHeight: number): number => {
  const gridHtmlElement = getElementById("grid-container")

  const head = gridHtmlElement.offsetTop
  const parentBorder = gridHtmlElement.parentElement?.clientTop ?? 0

  return totalHeight - head - parentBorder
}

export const setCellMatrix_ =
  (updateCellMatrix: any, forceUpdate: React.DispatchWithoutAction) =>
  (contentSize: number): void => {
    const grid = getElementById("grid")
    const scrollbarWidth = 15
    const currentWidth = grid.offsetWidth - scrollbarWidth

    const _columnCount = Math.floor(currentWidth / contentSize)

    const columnCount = _columnCount < 1 ? 1 : _columnCount
    const cellSize = currentWidth / columnCount
    updateCellMatrix({ columnCount, cellSize })

    forceUpdate()
  }

export const updateScrollTop = (scrollRatio: number): number =>
  scrollRatio * getElementFirstChild(getElementById("grid")).clientHeight

export const setScrollRatio_ =
  (updateScrollRatio: any) =>
  (scrollParams: ScrollParams): void => {
    const { clientHeight } = getElementFirstChild(getElementById("grid"))

    if (clientHeight !== 0) {
      const newScrollRatio = clientHeight === 0 ? 0 : scrollParams.scrollTop / clientHeight
      updateScrollRatio(newScrollRatio)
    }
  }
