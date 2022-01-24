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

import { PopOverConfirm, PopOverSubTitle, PopOverTitle, RedButton } from "../../../styles"
import { TrashIcon } from "./styles"
import { TrashProps } from "./types"

const TrashItem = ({ selectedMediaIds, pendingIdsInSelection, trashMedia, deselectAll }: TrashProps) => (
  <Popover>
    <PopoverTrigger>
      <HStack spacing={1}>
        <RedButton size="sm" variant="outline">
          <HStack spacing={1}>
            <TrashIcon />
            <Text children={"Move to bin"} />
          </HStack>
        </RedButton>
      </HStack>
    </PopoverTrigger>
    <Portal>
      <PopOverConfirm>
        <PopoverArrow />
        <PopoverHeader bg="gray.50">
          <PopOverTitle children={"Move to bin confirmation"} />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Box m={2}>
            {pendingIdsInSelection.length !== 0 && (
              <PopOverSubTitle children={`${pendingIdsInSelection.length} pending medias will be moved to bin`} />
            )}
            {selectedMediaIds.length - pendingIdsInSelection.length !== 0 && (
              <PopOverSubTitle
                children={`${
                  selectedMediaIds.length - pendingIdsInSelection.length
                } validated medias will remain unchanged`}
              />
            )}
          </Box>
        </PopoverBody>
        <PopoverFooter bg="gray.50">
          <Center>
            <HStack
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
            </HStack>
          </Center>
        </PopoverFooter>
      </PopOverConfirm>
    </Portal>
  </Popover>
)

export default TrashItem
