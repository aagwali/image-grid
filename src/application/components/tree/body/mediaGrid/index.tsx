import { isEmpty, prop, splitEvery } from "rambda"
import React, { useState } from "react"

import { Center, Checkbox } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector } from "../../../../../storeConfig"
import { getImageServerUrl } from "../../../../privates"
import { displaySlice } from "../../../../reducers"
import { useGetMediaByContextLabelQuery as useGetMedia } from "../../../../services"
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

const getStateProps = () => ({
  display: useAppSelector(prop("display")),
})

const MediaGrid = (_: RouteComponentProps) => {
  const {
    display: { contentSize, transparency },
  } = getStateProps()

  const { data: media, isFetching } = useGetMedia("TODS6")

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

  const openLightBox = (lightBoxItemId: string) => dispatch(actions.updateDisplay({ lightBoxItemId }))

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
      <ItemsBox data-fetching={isFetching}>
        <DynamicGrid
          cellSize={cellMatrix.cellSize}
          columnCount={cellMatrix.columnCount}
          rowCount={dataLayer.length}
          contentSize={contentSize}
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
