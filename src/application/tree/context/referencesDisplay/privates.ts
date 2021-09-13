import { indexOf, last, sort, uniq } from "rambda"

export const getSelectedMedia = (
  selectedMediaIds: string[],
  mediaIds: string[],
  mediumId: string,
  event: MouseEvent | KeyboardEvent,
) => {
  const selectedIndex = indexOf(mediumId, mediaIds)
  const lastSelectedIndex = indexOf(last(selectedMediaIds), mediaIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])

  if (event.shiftKey) return uniq([...selectedMediaIds, ...mediaIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectedMediaIds.includes(mediumId)
    ? selectedMediaIds.filter((selectedId) => selectedId !== mediumId)
    : [...selectedMediaIds, mediumId]
}
