import React from "react"

import { Center, Stack } from "@chakra-ui/react"

import { AccordionItemTitle } from "../../../../../../components/accordionItem/styles"
import SizeSlider from "../../../../../../components/dynamicGrid/sizeSlider"
import ToolTip from "../../../../../../components/tooltip"
import { ImagesSizeProps } from "./types"

export const ImagesSize = ({ contentSize, updateContentSize, updateCellMatrix, forceUpdate }: ImagesSizeProps) => (
  <Stack>
    <Center>
      <ToolTip tooltip="zoom">
        <AccordionItemTitle children={"Images Size"} />
      </ToolTip>
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
