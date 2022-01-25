import { equals, findIndex, prop } from "rambda"
import { useState } from "react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { getSelectedMedia } from "../../componentsLayout/mainDisplay/context/medias/privates"
import { mediaDisplaySlice, mediaSelector } from "../../componentsLayout/mainDisplay/context/medias/reducers"
import { MediaItem } from "../../types"

export const pickAdjacentMedia = (mediaIds: string[], lightBoxMediaId: string): [string, string] => {
  const firstIndex = 0
  const lastIndex = mediaIds.length - 1
  const currentIndex = findIndex(equals(lightBoxMediaId), mediaIds)

  const previousMediaId = mediaIds[currentIndex - 1]
  const nextMediaId = mediaIds[currentIndex + 1]

  // handle boundaries
  if (currentIndex === firstIndex) return [mediaIds[lastIndex], nextMediaId]
  if (currentIndex === lastIndex) return [previousMediaId, mediaIds[firstIndex]]

  return [previousMediaId, nextMediaId]
}

export const getMediaIdByIndex =
  (media: MediaItem[] = []) =>
  (index: number): string =>
    media[index]?.id ?? "lightBox-mediaId-error"

export const getContainerProps = () => {
  const { actions } = mediaDisplaySlice
  const dispatch = useAppDispatch()

  const { lightBoxMediaId, selectedMediaIds, whiteReplacement } = getState(prop("mediasDisplay"))
  const media = getState((s) => mediaSelector.selectById(s, lightBoxMediaId))

  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)

  const [isHd, updateIsHd] = useState(false)

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediaId, nextMediaId] = pickAdjacentMedia(mediaIds, lightBoxMediaId)

  const selectMedia = (media: typeof selectedMediaIds[0]) => (event: MouseEvent | KeyboardEvent) =>
    dispatch(
      actions.updateMediaDisplay({ selectedMediaIds: getSelectedMedia(selectedMediaIds, mediaIds, media, event) }),
    )
  const closeLightbox = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: "none" }))
  const setPrevious = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: previousMediaId }))
  const setNext = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: nextMediaId }))

  return {
    lightBoxMediaId,
    selectedMediaIds,
    whiteReplacement,
    media,
    lightBoxItemSize,
    updateLightBoxItemSize,
    lightBoxThumbnailSize,
    isHd,
    updateIsHd,
    previousMediaId,
    nextMediaId,
    selectMedia,
    closeLightbox,
    setPrevious,
    setNext,
  }
}
