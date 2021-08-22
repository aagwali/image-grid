import React from "react"

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"

import { SizeSliderProps } from "../types"
import { SliderBox } from "./styles"

const SizeSlider = ({
  sliderStepCount,
  contentSize,
  contentSizeRange,
  updateContentSize,
  setCellMatrix,
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
        setCellMatrix(selectedSize)
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
