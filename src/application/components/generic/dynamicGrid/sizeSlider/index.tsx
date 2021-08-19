import React from "react"

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"

import { setCellMatrix } from "../privates"
import { SizeSliderProps } from "../types"
import { SliderBox } from "./styles"

const SizeSlider = ({
  sliderStepCount,
  contentSize,
  contentSizeRange,
  updateContentSize,
  updateCellMatrix,
  updateScrollHeight,
}: SizeSliderProps) => (
  <SliderBox>
    <Slider
      min={contentSizeRange[0]}
      max={contentSizeRange[1]}
      step={(contentSizeRange[1] - contentSizeRange[0]) / sliderStepCount}
      defaultValue={contentSize}
      colorScheme="teal"
      onChangeEnd={(selectedSize) => {
        updateContentSize(selectedSize)
        setCellMatrix(updateCellMatrix, updateScrollHeight, selectedSize)
      }}
      focusThumbOnChange={false}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>

      <SliderThumb />
    </Slider>
  </SliderBox>
)

export default SizeSlider
