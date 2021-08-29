import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React, { useState } from "react"
import Lightbox from "react-image-lightbox"

import { HStack, Switch } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { getImageServerUrl } from "../../privates"
import { mediaGridSlice, mediaSelector } from "../../reducers"
import { getSelectedMedia } from "../context/mediaGrid/privates"
import { pickAdjacentMedia } from "./privates"
import { ImageTitle, LeftToolsBox, QualityText, SelectedButton, ToolBarBox } from "./styles"

const ToolBarButtons = ({
  title,
  isHd,
  updateIsHd,
  lightBoxItemSize,
  updateLightBoxItemSize,
  checked,
  selectMedium,
}: any): JSX.Element => {
  return (
    <ToolBarBox>
      <LeftToolsBox>
        <SelectedButton
          variant="outline"
          size="sm"
          children={"Selected"}
          item-checked={`${checked}`}
          onClick={selectMedium}
        />
        <HStack>
          <QualityText children={"SD"} />
          <Switch
            colorScheme="teal"
            size="sm"
            onChange={() => {
              updateIsHd(!isHd)
              updateLightBoxItemSize(Math.floor(isHd ? lightBoxItemSize / 2.5 : lightBoxItemSize * 2.5))
            }}
            isChecked={isHd}
          />
          <QualityText children={"HD"} />
        </HStack>
      </LeftToolsBox>
      <ImageTitle children={title} />
    </ToolBarBox>
  )
}

// depends on navigator cache
const LightBoxContainer = () => {
  const { actions } = mediaGridSlice
  const dispatch = useAppDispatch()

  const { lightBoxMediumId, selectMediaIds } = getState(prop("mediaGrid"))
  const medium = getState((s) => mediaSelector.selectById(s, lightBoxMediumId))

  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)

  const [isHd, updateIsHd] = useState(false)

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediumId, nextMediumId] = pickAdjacentMedia(mediaIds, lightBoxMediumId)

  const selectMedium = (medium: typeof selectMediaIds[0]) => (event: MouseEvent | KeyboardEvent) =>
    dispatch(actions.updateMediaGrid({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))

  if (lightBoxMediumId === "none") return <React.Fragment />

  return (
    <React.Fragment>
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
            title={medium?.fileName}
            isHd={isHd}
            updateIsHd={updateIsHd}
            lightBoxItemSize={lightBoxItemSize}
            updateLightBoxItemSize={updateLightBoxItemSize}
            checked={selectMediaIds.includes(lightBoxMediumId)}
            selectMedium={selectMedium(lightBoxMediumId)}
          />,
        ]}
      />
    </React.Fragment>
  )
}

export default LightBoxContainer
