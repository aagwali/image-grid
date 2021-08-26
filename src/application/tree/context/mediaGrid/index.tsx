import { add, prop } from "rambda"
import React, { useReducer } from "react"

import { Checkbox } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../dynamicGrid"
import SizeSlider from "../../../dynamicGrid/sizeSlider"
import ImageCard from "../../../imageCard"
import { getImageServerUrl } from "../../../privates"
import { mediaGridDisplaySlice, mediaSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import { DynamicGridBox, MediaBox, SettingsBox } from "./styles"

const MediaGrid = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaGridDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { transparency, contentSize, scrollRatio, cellMatrix } = getState(prop("mediaGridDisplay"))
  const media = getState(mediaSelector.selectAll)

  const toggleTransparency = () => dispatch(actions.updateDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateDisplay({ contentSize: x }))
  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateDisplay({ scrollRatio: x }))
  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateDisplay({ cellMatrix: x }))
  const openLightBox = (mediumId: string) => () => dispatch(actions.updateDisplay({ lightBoxMediumId: mediumId }))

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <DynamicGridBox>
      <SettingsBox>
        <SizeSlider
          sliderStepCount={10}
          contentSizeRange={[150, 350]}
          contentSize={contentSize}
          updateContentSize={updateContentSize}
          updateCellMatrix={updateCellMatrix}
          forceUpdate={forceUpdate}
        />
        <Checkbox children="Transparency" colorScheme="teal" isChecked={transparency} onChange={toggleTransparency} />
      </SettingsBox>

      <MediaBox data-loaded={mediaLoaded}>
        <DynamicGrid
          contentSize={contentSize}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
          cellMatrix={cellMatrix}
          updateCellMatrix={updateCellMatrix}
          items={media}
          itemsLoaded={mediaLoaded}
          renderItem={(medium: MediumItem) => (
            <ImageCard
              transparency={transparency}
              imageSize={contentSize}
              openLightBox={openLightBox(medium.id)}
              urlSource={getImageServerUrl(medium.id, contentSize)}
            />
          )}
          forceUpdate={forceUpdate}
        />
      </MediaBox>
    </DynamicGridBox>
  )
}

export default MediaGrid
