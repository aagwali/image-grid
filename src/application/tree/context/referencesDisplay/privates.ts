import { indexOf, last, sort, uniq } from "rambda"

export const getSelectedReferences = (
  selectedReferenceIds: string[],
  referencesIds: string[],
  referenceId: string,
  event: MouseEvent | KeyboardEvent,
): string[] => {
  const selectedIndex = indexOf(referenceId, referencesIds)
  const lastSelectedIndex = indexOf(last(selectedReferenceIds), referencesIds)

  const sortedIndexes = sort((a, b) => a - b, [selectedIndex, lastSelectedIndex])
  if (event.shiftKey)
    return uniq([...selectedReferenceIds, ...referencesIds.slice(sortedIndexes[0], sortedIndexes[1] + 1)])

  return selectedReferenceIds.includes(referenceId)
    ? selectedReferenceIds.filter((selectedId) => selectedId !== referenceId)
    : [...selectedReferenceIds, referenceId]
}
