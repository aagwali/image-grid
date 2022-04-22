

export const getElementById = (id: string): HTMLElement => document.getElementById(id) ?? document.createElement("div")

export const setHeight = (totalHeight: number): number => {
  const gridHtmlElement = getElementById("list-container")

  const head = gridHtmlElement.offsetTop
  const parentBorder = gridHtmlElement.parentElement?.clientTop ?? 0

  return totalHeight - head - parentBorder
}
