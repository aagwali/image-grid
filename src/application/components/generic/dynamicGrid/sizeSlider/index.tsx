import React from "react"

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"

import { setCellMatrix_ } from "../privates"
import { SizeSliderProps } from "../types"
import { SliderBox } from "./styles"

const SizeSlider = ({
  sliderStepCount,
  contentSize,
  contentSizeRange,
  updateContentSize,
  updateCellMatrix,
  forceUpdate,
}: SizeSliderProps) => {
  const _setCellMatrix_ = setCellMatrix_(updateCellMatrix, forceUpdate) // (contentSize)

  return (
    <SliderBox>
      <Slider
        min={contentSizeRange[0]}
        max={contentSizeRange[1]}
        step={(contentSizeRange[1] - contentSizeRange[0]) / sliderStepCount}
        defaultValue={contentSize}
        colorScheme="teal"
        onChangeEnd={(selectedSize) => {
          updateContentSize(selectedSize)
          _setCellMatrix_(selectedSize)
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
}

export default SizeSlider
