import { indexOf, last, sort, uniq } from "rambda"

export const getSelectedMedia = (selectMediaIds: string[], mediaIds: string[], mediumId: string, event: MouseEvent) => {
  const selectedIndex = indexOf(mediumId, mediaIds)
  const lastSelectedIndex = indexOf(last(selectMediaIds), mediaIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])

  if (event.shiftKey) return uniq([...selectMediaIds, ...mediaIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectMediaIds.includes(mediumId)
    ? selectMediaIds.filter((selectedId) => selectedId !== mediumId)
    : [...selectMediaIds, mediumId]
}
