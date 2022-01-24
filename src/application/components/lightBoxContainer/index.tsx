import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React, { useState } from "react"
import Lightbox from "react-image-lightbox"

import { HStack, Switch } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { getSelectedMedia } from "../../componentsTree/context/medias/privates"
import { mediaDisplaySlice, mediaSelector } from "../../componentsTree/context/medias/reducers"
import { getImageServerUrl } from "../../privates"
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
  const { actions } = mediaDisplaySlice
  const dispatch = useAppDispatch()

  const { lightBoxMediumId, selectedMediaIds, whiteReplacement } = getState(prop("mediaDisplay"))
  const medium = getState((s) => mediaSelector.selectById(s, lightBoxMediumId))

  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)

  const [isHd, updateIsHd] = useState(false)

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediumId, nextMediumId] = pickAdjacentMedia(mediaIds, lightBoxMediumId)

  const selectMedium = (medium: typeof selectedMediaIds[0]) => (event: MouseEvent | KeyboardEvent) =>
    dispatch(
      actions.updateMediaDisplay({ selectedMediaIds: getSelectedMedia(selectedMediaIds, mediaIds, medium, event) }),
    )

  if (lightBoxMediumId === "none") return <React.Fragment />

  return (
    <React.Fragment>
      <Lightbox
        mainSrc={getImageServerUrl(lightBoxMediumId, lightBoxItemSize, whiteReplacement)}
        prevSrc={getImageServerUrl(previousMediumId, lightBoxItemSize, whiteReplacement)}
        nextSrc={getImageServerUrl(nextMediumId, lightBoxItemSize, whiteReplacement)}
        mainSrcThumbnail={getImageServerUrl(lightBoxMediumId, lightBoxThumbnailSize, whiteReplacement)}
        prevSrcThumbnail={getImageServerUrl(previousMediumId, lightBoxThumbnailSize, whiteReplacement)}
        nextSrcThumbnail={getImageServerUrl(nextMediumId, lightBoxThumbnailSize, whiteReplacement)}
        enableZoom={isHd}
        animationDisabled={true} // avoid flashing render
        imagePadding={65}
        onCloseRequest={() => dispatch(actions.updateMediaDisplay({ lightBoxMediumId: "none" }))}
        onMovePrevRequest={() => dispatch(actions.updateMediaDisplay({ lightBoxMediumId: previousMediumId }))}
        onMoveNextRequest={() => dispatch(actions.updateMediaDisplay({ lightBoxMediumId: nextMediumId }))}
        toolbarButtons={[
          <ToolBarButtons
            title={medium?.fileName}
            isHd={isHd}
            updateIsHd={updateIsHd}
            lightBoxItemSize={lightBoxItemSize}
            updateLightBoxItemSize={updateLightBoxItemSize}
            checked={selectedMediaIds.includes(lightBoxMediumId)}
            selectMedium={selectMedium(lightBoxMediumId)}
          />,
        ]}
      />
    </React.Fragment>
  )
}

export default LightBoxContainer
