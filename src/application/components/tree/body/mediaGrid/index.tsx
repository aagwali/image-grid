import { isEmpty, prop, splitEvery } from "rambda"
import React, { useState } from "react"

import { Center, Checkbox } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { displaySlice, mediaSelector } from "../../../../reducers"
import { MediumItem } from "../../../../types"
import DynamicGrid from "../../../generic/dynamicGrid"
import SizeSlider from "../../../generic/dynamicGrid/sizeSlider"
import ImageCard from "../../../generic/imageCard"
import { CenteredTextBox } from "../home/styles"
import { GridBox, ItemsBox, SettingsBox } from "./styles"

export const imageCardContentRender =
  (dataLayer: MediumItem[][], contentSize: number, transparency: boolean, openLightBox: (mediaId: string) => void) =>
  ({ rowIndex, columnIndex, key, style }: any) => {
    const mediumItem = dataLayer[rowIndex][columnIndex]

    return (
      mediumItem && (
        <Center key={key} style={style}>
          <ImageCard
            urlSource={getImageServerUrl(mediumItem.id, contentSize)}
            imageSize={contentSize}
            transparency={transparency}
            openLightBox={() => openLightBox(mediumItem.id)}
          />
        </Center>
      )
    )
  }

const MediaGrid = (_: RouteComponentProps) => {
  const { contentSize, transparency } = getState(prop("display"))
  const media = getState(mediaSelector.selectAll)

  const { actions } = displaySlice
  const dispatch = useAppDispatch()

  const [scrollHeight, updateScrollHeight] = useState(0)
  const [scrollRatio, updateScrollRatio] = useState(0)
  const [cellMatrix, updateCellMatrix] = useState({
    columnCount: 1,
    cellSize: 250,
  })

  if (isEmpty(media)) return <CenteredTextBox children={"No medias to display"} />

  const dataLayer = splitEvery(cellMatrix.columnCount, media ?? [])

  const openLightBox = (lightBoxMediumId: string) => dispatch(actions.updateDisplay({ lightBoxMediumId }))

  return (
    <GridBox>
      <SettingsBox>
        <SizeSlider
          sliderStepCount={10}
          contentSize={contentSize}
          contentSizeRange={[150, 350]}
          updateContentSize={(contentSize: number) => dispatch(actions.updateDisplay({ contentSize }))}
          updateCellMatrix={updateCellMatrix}
          updateScrollHeight={updateScrollHeight}
        />
        <Checkbox
          children="Transparency"
          colorScheme="teal"
          isChecked={transparency}
          onChange={() => dispatch(actions.updateDisplay({ transparency: !transparency }))}
        />
      </SettingsBox>
      <ItemsBox>
        <DynamicGrid
          cellSize={cellMatrix.cellSize}
          columnCount={cellMatrix.columnCount}
          rowCount={dataLayer.length}
          contentSize={contentSize}
          // give prop "media" and use columnCount to calcul datalayer and remove it from card content renderer
          // give prop "image card component"  with contentSize and transparency
          cellRenderer={imageCardContentRender(dataLayer, contentSize, transparency, openLightBox)}
          updateCellMatrix={updateCellMatrix}
          scrollHeight={scrollHeight}
          updateScrollHeight={updateScrollHeight}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
        />
      </ItemsBox>
    </GridBox>
  )
}

export default MediaGrid
