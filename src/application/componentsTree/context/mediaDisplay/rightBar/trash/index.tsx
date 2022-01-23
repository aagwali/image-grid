import { intersection } from "rambda"
import React from "react"

import {
  Box,
  Center,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import { PopOverConfirm, RedButton, RightBarActionBox, SideBarSubTitle, SideBarTitle, TrashIcon } from "../../styles"
import { TrashProps } from "./types"

const TrashItem = ({ selectedMediaIds, pendingIdsInSelection, trashMedia, deselectAll }: TrashProps) => (
  <Popover>
    <PopoverTrigger>
      <RightBarActionBox spacing={1}>
        <RedButton size="sm" variant="outline">
          <HStack spacing={1}>
            <TrashIcon />
            <Text children={"Move to bin"} />
          </HStack>
        </RedButton>
      </RightBarActionBox>
    </PopoverTrigger>
    <Portal>
      <PopOverConfirm>
        <PopoverArrow />
        <PopoverHeader bg="gray.50">
          <SideBarTitle children={"Move to bin confirmation"} />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Box m={2}>
            {pendingIdsInSelection.length !== 0 && (
              <SideBarSubTitle children={`${pendingIdsInSelection.length} pending medias will be moved to bin`} />
            )}
            {selectedMediaIds.length - pendingIdsInSelection.length !== 0 && (
              <SideBarSubTitle
                children={`${
                  selectedMediaIds.length - pendingIdsInSelection.length
                } validated medias will remain unchanged`}
              />
            )}
          </Box>
        </PopoverBody>
        <PopoverFooter bg="gray.50">
          <Center>
            <RightBarActionBox
              spacing={1}
              onClick={() => {
                trashMedia(intersection(selectedMediaIds, pendingIdsInSelection))
                deselectAll()
              }}
            >
              <RedButton size="sm" variant="outline">
                <HStack spacing={1}>
                  <TrashIcon />
                  <Text children={"Move to bin"} />
                </HStack>
              </RedButton>
            </RightBarActionBox>
          </Center>
        </PopoverFooter>
      </PopOverConfirm>
    </Portal>
  </Popover>
)

export default TrashItem
