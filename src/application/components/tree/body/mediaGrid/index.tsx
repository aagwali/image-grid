import { isEmpty, prop } from "rambda"
import React from "react"

import { Center } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { displaySlice, mediaSelector } from "../../../../reducers"
import { MediumItem } from "../../../../types"
import DynamicGrid from "../../../generic/dynamicGrid"
import ImageCard from "../../../generic/imageCard"
import { CenteredTextBox } from "../home/styles"
import { DynamicGridBox } from "./styles"

const MediaGrid = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = displaySlice

  const { transparency, contentSize, scrollRatio } = getState(prop("display"))

  const toggleTransparency = () => dispatch(actions.updateDisplay({ transparency: !transparency }))
  const updateContentSize = (contentSize: number) => dispatch(actions.updateDisplay({ contentSize }))
  const updateScrollRatio = (scrollRatio: number) => dispatch(actions.updateDisplay({ scrollRatio }))
  const openLightBox = (mediumId: string) => () => dispatch(actions.updateDisplay({ lightBoxMediumId: mediumId }))

  const media = getState(mediaSelector.selectAll)

  if (isEmpty(media)) return <CenteredTextBox children={"No medias to display"} />

  return (
    <Center>
      <DynamicGridBox>
        <DynamicGrid
          transparency={transparency}
          toggleTransparency={toggleTransparency}
          contentSize={contentSize}
          contentSizeRange={[150, 350]}
          updateContentSize={updateContentSize}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
          items={media}
          renderItem={(medium: MediumItem) => (
            <ImageCard
              transparency={transparency}
              imageSize={contentSize}
              openLightBox={openLightBox(medium.id)}
              urlSource={getImageServerUrl(medium.id, contentSize)}
            />
          )}
        />
      </DynamicGridBox>
    </Center>
  )
}

export default MediaGrid
