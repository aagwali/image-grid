import React from "react"

import { Center, Stack } from "@chakra-ui/react"

import { AccordionItemTitle } from "../../../../../components/appAccordionItem/styles"
import AppToolTip from "../../../../../components/appTooltip"
import SizeSlider from "../../../../../components/dynamicGrid/sizeSlider"
import { ImagesSizeProps } from "./types"

export const ImagesSize = ({ contentSize, updateContentSize, updateCellMatrix, forceUpdate }: ImagesSizeProps) => (
  <Stack>
    <Center>
      <AppToolTip tooltip="zoom">
        <AccordionItemTitle children={"Images Size"} />
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
