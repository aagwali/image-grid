import { add, prop } from "rambda"
import React, { useReducer } from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, Center, Checkbox, Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../dynamicGrid"
import SizeSlider from "../../../dynamicGrid/sizeSlider"
import ImageCard from "../../../imageCard"
import { getHotkeys, getImageServerUrl } from "../../../privates"
import { mediaDisplaySlice, mediaSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import { getSelectedMedia } from "./privates"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  DisplayCheckboxGroup,
  LeftBarBox,
  LeftBarLabel,
  LeftBarLabelTitle,
  MediaBox,
  MediaDisplayBox,
} from "./styles"
import { MediaDisplayShortcuts } from "./types"

const MediaDisplay = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges } = getState(
    prop("mediaDisplay"),
  )
  const media = getState(mediaSelector.selectAll)
  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [headerCellRatio, headearRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const badgePadding = badges ? 5 : 0

  const allChecked = [cardHeader, badges, transparency].every(Boolean)
  const isIndeterminate = [cardHeader, badges, transparency].some(Boolean) && !allChecked
  const toggleCardHeader = () => dispatch(actions.updateMediaDisplay({ cardHeader: !cardHeader }))
  const toggleCardBadges = () => dispatch(actions.updateMediaDisplay({ badges: !badges }))
  const toggleDisplayOptions = (checked: boolean) =>
    dispatch(actions.updateMediaDisplay({ cardHeader: checked, badges: checked, transparency: checked }))
  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const updateContentSize = (x: typeof contentSize) => dispatch(actions.updateMediaDisplay({ contentSize: x }))
  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (medium: typeof selectMediaIds[0]) => (event: MouseEvent) =>
    dispatch(actions.updateMediaDisplay({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))
  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))
  const openLightBox = (mediumId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediumId: mediumId }))
  }

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === MediaDisplayShortcuts.Deselect) deselectAll()
    if (hotkey === MediaDisplayShortcuts.SelectAll) selectAll()
    if (hotkey === MediaDisplayShortcuts.Transparency) toggleTransparency()
  }

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <MediaDisplayBox>
      <Hotkeys keyName={getHotkeys(MediaDisplayShortcuts)} onKeyDown={handleHotkey} />

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

        {/* <SelectionBox spacing={5}>
          <Text children={`Selected : ${selectMediaIds.length} / ${mediaIds.length}`} />
          <SelectButton
            onClick={selectAll}
            variant={"outline"}
            size={"sm"}
            colorScheme="teal"
            children={"Select all"}
          />
          <SelectButton
            onClick={deselectAll}
            variant={"outline"}
            size={"sm"}
            colorScheme="teal"
            children={"Deselect all"}
          />
        </SelectionBox> */}
      </LeftBarBox>

      <MediaBox data-loaded={mediaLoaded}>
        <DynamicGrid
          contentSize={contentSize}
          scrollRatio={scrollRatio}
          updateScrollRatio={updateScrollRatio}
          cellMatrix={cellMatrix}
          updateCellMatrix={updateCellMatrix}
          items={media}
          itemsLoaded={mediaLoaded}
          headerHeightRatio={headerCellRatio}
          renderItem={(medium: MediumItem) => (
            <ImageCard
              title={medium.fileName}
              subtitle={`${medium.width} x ${medium.height}`}
              transparency={transparency}
              imageSize={contentSize}
              checked={selectMediaIds.includes(medium.id)}
              getUrlBySize={(size: number) => getImageServerUrl(medium.id, size)} // cf. paddedSize
              openLightBox={openLightBox(medium.id)}
              selectionHandler={selectionHandler(medium.id)}
              status={medium.status}
              headerHeightRatio={headearRatio}
              controlId={medium.controlId}
              badgePadding={badgePadding}
            />
          )}
          forceUpdate={forceUpdate}
        />
      </MediaBox>
    </MediaDisplayBox>
  )
}

export default MediaDisplay
