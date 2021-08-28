import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React, { useState } from "react"
import Lightbox from "react-image-lightbox"

import { Text } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { getImageServerUrl } from "../../privates"
import { mediaGridSlice, mediaSelector } from "../../reducers"
import { pickAdjacentMedia } from "./privates"
import { QualitySwitch, SwitchBox } from "./styles"

const ToolBarButtons = ({ isHd, updateIsHd, lightBoxItemSize, updateLightBoxItemSize }: any): JSX.Element => {
  return (
    <SwitchBox>
      <Text children={"SD"} />
      <QualitySwitch
        colorScheme="teal"
        size="sm"
        onChange={() => {
          updateIsHd(!isHd)
          updateLightBoxItemSize(Math.floor(isHd ? lightBoxItemSize / 2.5 : lightBoxItemSize * 2.5))
        }}
        isChecked={isHd}
      />
      <Text children={"HD"} />
    </SwitchBox>
  )
}

// depends on navigator cache
const LightBoxContainer = () => {
  const { lightBoxMediumId } = getState(prop("mediaGrid"))
  const { actions } = mediaGridSlice
  const dispatch = useAppDispatch()

  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)

  const [isHd, updateIsHd] = useState(false)

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediumId, nextMediumId] = pickAdjacentMedia(mediaIds, lightBoxMediumId)

  if (lightBoxMediumId === "none") return <React.Fragment />

  console.log("lightBoxItemSize =====> ", lightBoxItemSize)

  return (
    <Lightbox
      mainSrc={getImageServerUrl(lightBoxMediumId, lightBoxItemSize)}
      prevSrc={getImageServerUrl(previousMediumId, lightBoxItemSize)}
      nextSrc={getImageServerUrl(nextMediumId, lightBoxItemSize)}
      mainSrcThumbnail={getImageServerUrl(lightBoxMediumId, lightBoxThumbnailSize)}
      prevSrcThumbnail={getImageServerUrl(previousMediumId, lightBoxThumbnailSize)}
      nextSrcThumbnail={getImageServerUrl(nextMediumId, lightBoxThumbnailSize)}
      enableZoom={isHd}
      animationDisabled={true} // avoid flashing render
      imagePadding={65}
      onCloseRequest={() => dispatch(actions.updateMediaGrid({ lightBoxMediumId: "none" }))}
      onMovePrevRequest={() => dispatch(actions.updateMediaGrid({ lightBoxMediumId: previousMediumId }))}
      onMoveNextRequest={() => dispatch(actions.updateMediaGrid({ lightBoxMediumId: nextMediumId }))}
      toolbarButtons={[
        <ToolBarButtons
          isHd={isHd}
          updateIsHd={updateIsHd}
          lightBoxItemSize={lightBoxItemSize}
          updateLightBoxItemSize={updateLightBoxItemSize}
        />,
      ]}
    />
  )
}

export default LightBoxContainer
