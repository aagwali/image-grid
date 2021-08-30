import { add, prop } from "rambda"
import React, { useReducer } from "react"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, Center, Checkbox, Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import SizeSlider from "../../../../dynamicGrid/sizeSlider"
import { mediaDisplaySlice } from "../../../../reducers"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DisplayCheckboxGroup,
  LeftBarBox,
  LeftBarLabel,
  LeftBarLabelTitle,
} from "./styles"

const MediaDisplayLeftBar = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { transparency, contentSize, cellMatrix, cardHeader, badges } = getState(prop("mediaDisplay"))

  const allChecked = [cardHeader, badges, transparency].every(Boolean)
  const isIndeterminate = [cardHeader, badges, transparency].some(Boolean) && !allChecked
  const toggleCardHeader = () => dispatch(actions.updateMediaDisplay({ cardHeader: !cardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateMediaDisplay({ badges: !badges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(actions.updateMediaDisplay({ cardHeader: checked, badges: checked, transparency: checked }))
  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaDisplay({ contentSize: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <LeftBarBox>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle flex="1" textAlign="left" children={"Display options"} />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack mt={3} spacing={8}>
              <Stack>
                <Center>
                  <LeftBarLabelTitle children={"Images Zoom"} />
                </Center>
                <SizeSlider
                  sliderStepCount={10}
                  contentSizeRange={[150, 350]}
                  contentSize={contentSize}
                  updateContentSize={updateContentSize}
                  updateCellMatrix={updateCellMatrix}
                  forceUpdate={forceUpdate}
                />
              </Stack>
              <DisplayCheckboxGroup>
                <Checkbox
                  size={"sm"}
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => toggleDisplayOptions(e.target.checked)}
                >
                  <LeftBarLabelTitle children={"Images information"} />
                </Checkbox>
                <Stack pl={6} spacing={1}>
                  <Checkbox isChecked={cardHeader} size={"sm"} onChange={toggleCardHeader}>
                    <LeftBarLabel children={"Filename"} />
                  </Checkbox>
                  <Checkbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
                    <LeftBarLabel children={"Badges"} />
                  </Checkbox>
                  <Checkbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
                    <LeftBarLabel children={"Transparency"} />
                  </Checkbox>
                </Stack>
              </DisplayCheckboxGroup>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </LeftBarBox>
  )
}

export default MediaDisplayLeftBar
