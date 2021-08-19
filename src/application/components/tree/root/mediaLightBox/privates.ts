import { findIndex, propEq } from "rambda"

import { MediumItem } from "../../../../types"

export const findIndexes = (lightBoxItemId: string, media: MediumItem[] = []): [number, number, number] => {
  const index = findIndex(propEq("id", lightBoxItemId), media)

  // handle boundaries
  const firstIndex = 0
  const lastIndex = media.length - 1
  if (index === firstIndex) return [lastIndex, index, index + 1]
  if (index === lastIndex) return [index - 1, index, firstIndex]

  // previous, current, next
  return [index - 1, index, index + 1]
}

export const getMediaIdByIndex =
  (media: MediumItem[] = []) =>
  (index: number): string =>
    media[index]?.id ?? "lightBox-mediaId-error"
