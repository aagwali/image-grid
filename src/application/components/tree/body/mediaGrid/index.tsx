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

  const { contentSize, transparency } = getState(prop("display"))

  const openLightBox = (mediumId: string) => () => dispatch(actions.updateDisplay({ lightBoxMediumId: mediumId }))
  const toggleTransparency = () => dispatch(actions.updateDisplay({ transparency: !transparency }))
  const updateContentSize = (contentSize: number) => dispatch(actions.updateDisplay({ contentSize }))

  const media = getState(mediaSelector.selectAll)

  if (isEmpty(media)) return <CenteredTextBox children={"No medias to display"} />

  return (
    <Center>
      <DynamicGridBox>
        <DynamicGrid
          items={media}
          contentSize={contentSize}
          updateContentSize={updateContentSize}
          contentSizeRange={[150, 350]}
          transparency={transparency}
          toggleTransparency={toggleTransparency}
          renderItem={(medium: MediumItem) => (
            <ImageCard
              urlSource={getImageServerUrl(medium.id, contentSize)}
              imageSize={contentSize}
              transparency={transparency}
              openLightBox={openLightBox(medium.id)}
            />
          )}
        />
      </DynamicGridBox>
    </Center>
  )
}

export default MediaGrid
