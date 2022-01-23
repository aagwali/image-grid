import React from "react"

import { Center, Stack } from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import SizeSlider from "../../../../../components/dynamicGrid/sizeSlider"
import { LeftBarLabelTitle } from "../../styles"
import { ImagesSizeProps } from "./types"

export const ImagesSize = ({ contentSize, updateContentSize, updateCellMatrix, forceUpdate }: ImagesSizeProps) => (
  <Stack>
    <Center>
      <AppToolTip tooltip="zoom">
        <LeftBarLabelTitle children={"Images Size"} />
      </AppToolTip>
    </Center>
    <SizeSlider
      sliderStepCount={10}
      contentSizeRange={[130, 330]}
      contentSize={contentSize}
      updateContentSize={updateContentSize}
      updateCellMatrix={updateCellMatrix}
      forceUpdate={forceUpdate}
    />
  </Stack>
)
