import { equals, findIndex, prop } from "rambda"
import { useState } from "react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import {
  mediasDisplaySlice,
  mediaSelector,
  mediasFilteredByUrlSelector,
} from "../../componentsLayout/mainDisplay/context/medias/reducers"
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
  const { actions } = mediasDisplaySlice
  const dispatch = useAppDispatch()

  const { lightBoxMediaId, whiteReplacement, userBadges } = getState(prop("mediasDisplay"))
  const media = getState((s) => mediaSelector.selectById(s, lightBoxMediaId))
  const displayedMedias = getState((x) => mediasFilteredByUrlSelector(x, location.search))
  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const [isHd, updateIsHd] = useState(false)

  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)
  const displayedMediaIds = displayedMedias.map(prop("id"))
  const [previousMediaId, nextMediaId] = pickAdjacentMedia(displayedMediaIds, lightBoxMediaId)

  const setSelection = (mediaId: string) => (mouseEvent: MouseEvent) =>
    dispatch(
      actions.updateUserBadgesSelection({
        mediaIds: [mediaId],
        isShiftKey: mouseEvent.shiftKey,
        displayedMediaIds,
      }),
    )
  const closeLightbox = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: "none" }))
  const setPrevious = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: previousMediaId }))
  const setNext = () => dispatch(actions.updateMediaDisplay({ lightBoxMediaId: nextMediaId }))

  return {
    lightBoxMediaId,
    whiteReplacement,
    media: media ?? ({} as MediaItem),
    lightBoxItemSize,
    lightBoxThumbnailSize,
    isHd,
    previousMediaId,
    nextMediaId,
    userBadges,
    updateLightBoxItemSize,
    updateIsHd,
    setSelection,
    closeLightbox,
    setPrevious,
    setNext,
  }
}
