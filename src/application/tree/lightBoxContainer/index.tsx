import "react-image-lightbox/style.css"

import { prop } from "rambda"
import React, { useState } from "react"
import Lightbox from "react-image-lightbox"

import { Switch } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { getImageServerUrl } from "../../privates"
import { mediaGridSlice, mediaSelector } from "../../reducers"
import { getSelectedMedia } from "../context/mediaGrid/privates"
import { pickAdjacentMedia } from "./privates"
import { QualityText, SelectedButton, SwitchBox, ToolBarBox } from "./styles"

const ToolBarButtons = ({
  isHd,
  updateIsHd,
  lightBoxItemSize,
  updateLightBoxItemSize,
  checked,
  selectMedium,
}: any): JSX.Element => {
  return (
    <ToolBarBox>
      <SelectedButton
        variant="outline"
        size="sm"
        children={"Selected"}
        item-checked={`${checked}`}
        onClick={selectMedium}
      />
      <SwitchBox>
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
      </SwitchBox>
    </ToolBarBox>
  )
}

// depends on navigator cache
const LightBoxContainer = () => {
  const { lightBoxMediumId, selectMediaIds } = getState(prop("mediaGrid"))
  const { actions } = mediaGridSlice
  const dispatch = useAppDispatch()

  const [lightBoxItemSize, updateLightBoxItemSize] = useState(Number(process.env.LIGHTBOX_ITEM_SIZE) / 2.5 ?? 500)
  const lightBoxThumbnailSize = Math.floor(lightBoxItemSize / 10)

  const [isHd, updateIsHd] = useState(false)

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [previousMediumId, nextMediumId] = pickAdjacentMedia(mediaIds, lightBoxMediumId)

  const selectMedium = (medium: typeof selectMediaIds[0]) => (event: MouseEvent | KeyboardEvent) =>
    dispatch(actions.updateMediaGrid({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))

  if (lightBoxMediumId === "none") return <React.Fragment />

  const handleHotkey = (input: string) => (e: any) => selectMedium(input)(e)

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
