import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React from "react"
import Lightbox from "react-image-lightbox"

import { useAppDispatch, useAppSelector } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { displaySlice } from "../../../../reducers"
import { useGetMediaByContextLabelQuery as useGetMedia } from "../../../../services"
import { findIndexes, getMediaIdByIndex } from "./privates"

const getStateProps = () => ({
  display: useAppSelector(prop("display")),
})

const MediaLightBox = () => {
  const {
    display: { lightBoxItemId },
  } = getStateProps()

  const { data: media } = useGetMedia("TODS6")

  const lightBoxItemSize = Number(process.env.LIGHTBOX_ITEM_SIZE) ?? 500
  const lightBoxThumbnailSize = lightBoxItemSize / 10

  const { actions } = displaySlice
  const dispatch = useAppDispatch()

  if (lightBoxItemId === "none") return <React.Fragment />

  const _getMediaIdByIndex = getMediaIdByIndex(media)

  const [previousIndex, index, nextIndex] = findIndexes(lightBoxItemId, media)
  console.log(previousIndex, index, nextIndex)

  return (
    <Lightbox
      prevSrc={getImageServerUrl(_getMediaIdByIndex(previousIndex), lightBoxItemSize)}
      mainSrc={getImageServerUrl(_getMediaIdByIndex(index), lightBoxItemSize)}
      nextSrc={getImageServerUrl(_getMediaIdByIndex(nextIndex), lightBoxItemSize)}
      prevSrcThumbnail={getImageServerUrl(_getMediaIdByIndex(previousIndex), lightBoxThumbnailSize)}
      mainSrcThumbnail={getImageServerUrl(_getMediaIdByIndex(index), lightBoxThumbnailSize)}
      nextSrcThumbnail={getImageServerUrl(_getMediaIdByIndex(nextIndex), lightBoxThumbnailSize)}
      enableZoom={true}
      animationDisabled={true} // avoid flashing render
      imagePadding={65}
      onCloseRequest={() => dispatch(actions.updateDisplay({ lightBoxItemId: "none" }))}
      onMovePrevRequest={() => dispatch(actions.updateDisplay({ lightBoxItemId: _getMediaIdByIndex(previousIndex) }))}
      onMoveNextRequest={() => dispatch(actions.updateDisplay({ lightBoxItemId: _getMediaIdByIndex(nextIndex) }))}
    />
  )
}

export default MediaLightBox
