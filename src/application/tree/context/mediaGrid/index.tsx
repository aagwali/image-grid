import { add, prop } from "rambda"
import React, { useReducer } from "react"

import { Checkbox, Text } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../dynamicGrid"
import SizeSlider from "../../../dynamicGrid/sizeSlider"
import ImageCard from "../../../imageCard"
import { getImageServerUrl } from "../../../privates"
import { mediaGridSlice, mediaSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import { getSelectedMedia } from "./privates"
import { DynamicGridBox, HeaderBox, MediaBox, SelectButton, SelectionBox, SizeBox, TransparencyBox } from "./styles"

const MediaGrid = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaGridSlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectMediaIds, transparency, contentSize, scrollRatio, cellMatrix } = getState(prop("mediaGrid"))
  const media = getState(mediaSelector.selectAll)
  const mediaIds = getState(mediaSelector.selectIds) as string[]

  const toggleTransparency = () => dispatch(actions.updateMediaGrid({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaGrid({ contentSize: x }))
  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaGrid({ scrollRatio: x }))
  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaGrid({ cellMatrix: x }))
  const select = (medium: typeof selectMediaIds[0]) => (event: MouseEvent) =>
    dispatch(actions.updateMediaGrid({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))
  const selectAll = () => dispatch(actions.updateMediaGrid({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaGrid({ selectMediaIds: [] }))
  const openLightBox = (mediumId: string) => () => dispatch(actions.updateMediaGrid({ lightBoxMediumId: mediumId }))

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <DynamicGridBox>
      <HeaderBox>
        <TransparencyBox>
          <Checkbox children="Transparency" colorScheme="teal" isChecked={transparency} onChange={toggleTransparency} />
        </TransparencyBox>
        <Text children={"Size : "} />
        <SizeBox>
          <SizeSlider
            sliderStepCount={10}
            contentSizeRange={[150, 350]}
            contentSize={contentSize}
            updateContentSize={updateContentSize}
            updateCellMatrix={updateCellMatrix}
            forceUpdate={forceUpdate}
          />
        </SizeBox>
        <SelectionBox spacing={5}>
          <Text children={`Selected : ${selectMediaIds.length} / ${mediaIds.length}`} />
          <SelectButton onClick={selectAll} colorScheme="teal" children={"Select all"} />
          <SelectButton onClick={deselectAll} colorScheme="teal" children={"Deselect all"} />
        </SelectionBox>
      </HeaderBox>

      <MediaBox data-loaded={mediaLoaded}>
        <DynamicGrid
          contentSize={contentSize}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
          cellMatrix={cellMatrix}
          updateCellMatrix={updateCellMatrix}
          items={media}
          itemsLoaded={mediaLoaded}
          renderItem={(medium: MediumItem) => {
            return (
              <ImageCard
                transparency={transparency}
                imageSize={contentSize}
                checked={selectMediaIds.includes(medium.id)}
                urlSource={getImageServerUrl(medium.id, contentSize)}
                openLightBox={openLightBox(medium.id)}
                toggleCardSelection={select(medium.id)}
              />
            )
          }}
          forceUpdate={forceUpdate}
        />
      </MediaBox>
    </DynamicGridBox>
  )
}

export default MediaGrid
