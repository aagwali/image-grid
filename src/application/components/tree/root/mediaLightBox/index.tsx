import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React from "react"
import Lightbox from "react-image-lightbox"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { mediaGridDisplaySlice, mediaSelector } from "../../../../reducers"
import { pickAdjacentMedia } from "./privates"

const MediaLightBox = () => {
  const { lightBoxMediumId } = getState(prop("mediaGridDisplay"))

  const { actions } = mediaGridDisplaySlice
  const dispatch = useAppDispatch()

  const lightBoxItemSize = Number(process.env.LIGHTBOX_ITEM_SIZE) ?? 500
  const lightBoxThumbnailSize = lightBoxItemSize / 10

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediumId, nextMediumId] = pickAdjacentMedia(mediaIds, lightBoxMediumId)

  if (lightBoxMediumId === "none") return <React.Fragment />

  return (
    <Lightbox
      mainSrc={getImageServerUrl(lightBoxMediumId, lightBoxItemSize)}
      prevSrc={getImageServerUrl(previousMediumId, lightBoxItemSize)}
      nextSrc={getImageServerUrl(nextMediumId, lightBoxItemSize)}
      mainSrcThumbnail={getImageServerUrl(lightBoxMediumId, lightBoxThumbnailSize)}
      prevSrcThumbnail={getImageServerUrl(previousMediumId, lightBoxThumbnailSize)}
      nextSrcThumbnail={getImageServerUrl(nextMediumId, lightBoxThumbnailSize)}
      enableZoom={true}
      animationDisabled={true} // avoid flashing render
      imagePadding={65}
      onCloseRequest={() => dispatch(actions.updateDisplay({ lightBoxMediumId: "none" }))}
      onMovePrevRequest={() => dispatch(actions.updateDisplay({ lightBoxMediumId: previousMediumId }))}
      onMoveNextRequest={() => dispatch(actions.updateDisplay({ lightBoxMediumId: nextMediumId }))}
    />
  )
}

export default MediaLightBox
