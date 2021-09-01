import { isEmpty, prop } from "rambda"
import React from "react"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import { mediaDisplaySlice, mediaSelector } from "../../../../reducers"
import {
  AccordionButtonBox,
  AccordionButtonTitle,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  UnselectAllIcon,
} from "./styles"

const MediaDisplayRightBar = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { selectMediaIds } = getState(prop("mediaDisplay"))
  const mediaIds = getState(mediaSelector.selectIds) as string[]

  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))

  return (
    <Box w={72}>
      <Accordion allowMultiple>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <AccordionButtonTitle
              flex="1"
              textAlign="left"
              children={`Selection ${selectMediaIds.length} / ${mediaIds.length}`}
            />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack mt={0} spacing={4}>
              <RightBarActionBox spacing={1} onClick={selectAll}>
                <SelectAllIcon />
                <RightBarAction children={"Select all medias"} />
              </RightBarActionBox>
              <RightBarActionBox
                enabled={!isEmpty(selectMediaIds) ? "true" : "false"}
                spacing={1}
                onClick={deselectAll}
              >
                <UnselectAllIcon />
                <RightBarAction children={"Unselect all medias"} />
              </RightBarActionBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default MediaDisplayRightBar
