import React from "react"
import Hotkeys from "react-hot-keys"

import { Slider, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"

import { getHotkeys } from "../../privates"
import { setCellMatrix_ } from "../privates"
import { SliderBox, SliderTrackCustom } from "../styles"
import { SizeSliderProps, SizeSliderShortcuts } from "../types"

const SizeSlider = ({
  sliderStepCount,
  contentSize,
  contentSizeRange,
  updateContentSize,
  updateCellMatrix,
  forceUpdate,
}: SizeSliderProps) => {
  const step = (contentSizeRange[1] - contentSizeRange[0]) / sliderStepCount

  const setDisplay = (selectedSize: number) => {
    updateContentSize(selectedSize)
    setCellMatrix_(updateCellMatrix, forceUpdate)(selectedSize)
  }

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === SizeSliderShortcuts.MediumSizeUp && contentSize < contentSizeRange[1]) setDisplay(contentSize + step)

    if (hotkey === SizeSliderShortcuts.MediumSizeDown && contentSize > contentSizeRange[0])
      setDisplay(contentSize - step)
  }

  return (
    <SliderBox>
      <Hotkeys keyName={getHotkeys(SizeSliderShortcuts)} onKeyDown={handleHotkey} />

      <Slider
        min={contentSizeRange[0]}
        max={contentSizeRange[1]}
        step={step}
        defaultValue={contentSize}
        onChangeEnd={(selectedSize) => {
          setDisplay(selectedSize)
        }}
        focusThumbOnChange={false}
      >
        <SliderTrackCustom>
          <SliderFilledTrack />
        </SliderTrackCustom>

        <SliderThumb />
      </Slider>
    </SliderBox>
  )
}

export default SizeSlider
