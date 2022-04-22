import "react-image-lightbox/style.css"

import React from "react"
import Lightbox from "react-image-lightbox"

import { HStack, Switch } from "@chakra-ui/react"

import { getImageServerUrl } from "../../privates"
import { getContainerProps } from "./privates"
import { ImageTitle, LeftToolsBox, QualityText, SelectedButton, ToolBarBox } from "./styles"

const ToolBarButtons = ({
  title,
  isHd,
  updateIsHd,
  lightBoxItemSize,
  updateLightBoxItemSize,
  checked,
  setSelection,
}: any): JSX.Element => {
  return (
    <ToolBarBox>
      <LeftToolsBox>
        <SelectedButton
          variant="outline"
          size="sm"
          children={"Selected"}
          item-checked={`${checked}`}
          onClick={setSelection}
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

// perfs depends on navigator cache
const LightBox = () => {
  const {
    lightBoxMediaId,
    whiteReplacement,
    media,
    lightBoxItemSize,
    lightBoxThumbnailSize,
    isHd,
    previousMediaId,
    nextMediaId,
    userBadges,
    setNext,
    updateIsHd,
    setSelection,
    closeLightbox,
    setPrevious,
    updateLightBoxItemSize,
  } = getContainerProps()

  if (lightBoxMediaId === "none") return <React.Fragment />

  return (
    <React.Fragment>
      <Lightbox
        mainSrc={getImageServerUrl(lightBoxMediaId, lightBoxItemSize, whiteReplacement)}
        prevSrc={getImageServerUrl(previousMediaId, lightBoxItemSize, whiteReplacement)}
        nextSrc={getImageServerUrl(nextMediaId, lightBoxItemSize, whiteReplacement)}
        mainSrcThumbnail={getImageServerUrl(lightBoxMediaId, lightBoxThumbnailSize, whiteReplacement)}
        prevSrcThumbnail={getImageServerUrl(previousMediaId, lightBoxThumbnailSize, whiteReplacement)}
        nextSrcThumbnail={getImageServerUrl(nextMediaId, lightBoxThumbnailSize, whiteReplacement)}
        enableZoom={isHd}
        animationDisabled={true} // avoid flashing render
        imagePadding={65}
        onCloseRequest={closeLightbox}
        onMovePrevRequest={setPrevious}
        onMoveNextRequest={setNext}
        toolbarButtons={[
          <ToolBarButtons
            title={media?.fileName}
            isHd={isHd}
            updateIsHd={updateIsHd}
            lightBoxItemSize={lightBoxItemSize}
            updateLightBoxItemSize={updateLightBoxItemSize}
            checked={userBadges[media?.id]?.selected ?? false}
            setSelection={setSelection(lightBoxMediaId)}
          />,
        ]}
      />
    </React.Fragment>
  )
}

export default LightBox
