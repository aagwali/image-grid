/////////////

import { findIndex, propEq } from "rambda"

import { MediumItem } from "../../../types"

export const findIndexes = (lightBoxItemId: string, media: MediumItem[] = []): [number, number, number] => {
  const index = findIndex(propEq("id", lightBoxItemId), media)
  return [index - 1, index, index + 1]
}

export const getMediaIdByIndex =
  (media: MediumItem[] = []) =>
  (index: number): string =>
    media[index]?.id ?? "lightBox-mediaId-error"
