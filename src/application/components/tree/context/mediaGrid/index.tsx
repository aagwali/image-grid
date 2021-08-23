import { add, isEmpty, prop } from "rambda"
import React, { useReducer } from "react"

import { Center, Checkbox } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { mediaGridDisplaySlice, mediaSelector } from "../../../../reducers"
import { MediumItem } from "../../../../types"
import DynamicGrid from "../../../generic/dynamicGrid"
import SizeSlider from "../../../generic/dynamicGrid/sizeSlider"
import ImageCard from "../../../generic/imageCard"
import { DynamicGridBox, ItemsBox, SettingsBox } from "./styles"

const MediaGrid = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaGridDisplaySlice

  const { loaded } = getState(prop("media"))
  const { transparency, contentSize, scrollRatio, cellMatrix } = getState(prop("mediaGridDisplay"))
  const media = getState(mediaSelector.selectAll)

  const toggleTransparency = () => dispatch(actions.updateDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateDisplay({ contentSize: x }))
  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateDisplay({ scrollRatio: x }))
  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateDisplay({ cellMatrix: x }))
  const openLightBox = (mediumId: string) => () => dispatch(actions.updateDisplay({ lightBoxMediumId: mediumId }))

  const [, forceUpdate] = useReducer(add(1), 0)

  if (loaded && isEmpty(media)) return <Center children={"No medias to display"} />

  return (
    <DynamicGridBox>
      <SettingsBox>
        <SizeSlider
          sliderStepCount={10}
          contentSize={contentSize}
          contentSizeRange={[150, 350]}
          updateContentSize={updateContentSize}
          updateCellMatrix={updateCellMatrix}
          forceUpdate={forceUpdate}
        />
        <Checkbox children="Transparency" colorScheme="teal" isChecked={transparency} onChange={toggleTransparency} />
      </SettingsBox>

      <ItemsBox data-loaded={loaded}>
        <DynamicGrid
          contentSize={contentSize}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
          cellMatrix={cellMatrix}
          updateCellMatrix={updateCellMatrix}
          items={media}
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
      </ItemsBox>
    </DynamicGridBox>
  )
}

export default MediaGrid
