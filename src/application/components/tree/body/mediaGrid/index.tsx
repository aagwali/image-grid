import { isEmpty, prop, splitEvery } from "rambda"
import React, { useState } from "react"

import { Center, Checkbox, HStack, VStack } from "@chakra-ui/react"
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
import { GridBox } from "./styles"

export const openLightBox = (mediumId: string) => {}

export const imageCardContentRender =
  (dataLayer: MediumItem[][], contentSize: number, transparency: boolean, dispatch: any, actions: any) =>
  ({ rowIndex, columnIndex, key, style }: any) => {
    const mediumItem = dataLayer[rowIndex][columnIndex]

    return (
      mediumItem && (
        <Center key={key} style={style}>
          <ImageCard
            urlSource={getImageServerUrl(mediumItem.id, contentSize)}
            imageSize={contentSize}
            transparency={transparency}
            openLightBox={() => dispatch(actions.updateLightBoxMediaId(mediumItem.id))}
          />
        </Center>
      )
    )
  }

const getStateProps = () => ({
  display: useAppSelector(prop("display")),
})

const MediaGrid = (_: RouteComponentProps) => {
  const { display } = getStateProps()

  const { data: media, isFetching } = useGetMedia("TODS6")

  const { actions } = displaySlice
  const dispatch = useAppDispatch()

  const [cellMatrix, updateCellMatrix] = useState({
    columnCount: 1,
    cellSize: 250,
  })
  const [scrollHeight, updateScrollHeight] = useState(0)
  const [scrollRatio, updateScrollRatio] = useState(0)

  if (isEmpty(media)) return <CenteredTextBox children={"No medias to display"} />

  const dataLayer = splitEvery(cellMatrix.columnCount, media ?? []) as MediumItem[][]

  return (
    <VStack>
      <HStack>
        <SizeSlider
          sliderStepCount={10}
          contentSize={display.contentSize}
          contentSizeRange={[150, 350]}
          updateContentSize={(n: number) => dispatch(actions.updateContentSize(n))}
          updateCellMatrix={updateCellMatrix}
          updateScrollHeight={updateScrollHeight}
        />
        <Checkbox
          children="Transparency"
          isChecked={display.transparency}
          onChange={() => dispatch(actions.updateTransparency(!display.transparency))}
        />
      </HStack>
      <GridBox data-fetching={isFetching}>
        <DynamicGrid
          cellSize={cellMatrix.cellSize}
          columnCount={cellMatrix.columnCount}
          rowCount={dataLayer.length}
          contentSize={display.contentSize}
          cellRenderer={imageCardContentRender(dataLayer, display.contentSize, display.transparency, dispatch, actions)}
          updateCellMatrix={updateCellMatrix}
          scrollHeight={scrollHeight}
          updateScrollHeight={updateScrollHeight}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
        />
      </GridBox>
    </VStack>
  )
}

export default MediaGrid
