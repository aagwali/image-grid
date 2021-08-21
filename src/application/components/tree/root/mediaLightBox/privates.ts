import { equals, findIndex } from "rambda"

import { MediumItem } from "../../../../types"

export const pickAdjacentMedia = (mediaIds: string[], lightBoxMediumId: string): [string, string] => {
  const firstIndex = 0
  const lastIndex = mediaIds.length - 1
  const currentIndex = findIndex(equals(lightBoxMediumId), mediaIds)

  const previousMediumId = mediaIds[currentIndex - 1]
  const nextMediumId = mediaIds[currentIndex + 1]

  // handle boundaries
  if (currentIndex === firstIndex) return [mediaIds[lastIndex], nextMediumId]
  if (currentIndex === lastIndex) return [previousMediumId, mediaIds[firstIndex]]

  return [previousMediumId, nextMediumId]
}

export const getMediaIdByIndex =
  (media: MediumItem[] = []) =>
  (index: number): string =>
    media[index]?.id ?? "lightBox-mediaId-error"
