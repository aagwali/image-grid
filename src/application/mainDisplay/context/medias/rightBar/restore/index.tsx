import React from "react"

import { HStack, Text } from "@chakra-ui/react"

import ToolTip from "../../../../../components/tooltip"
import { TealButton } from "../../../styles"
import { RestoreIcon } from "./styles"
import { RestoreProps } from "./types"

const RestoreItem = ({ selectedMediaIds, restoreMedia, deselectAll }: RestoreProps) => (
  <HStack
    spacing={1}
    onClick={() => {
      restoreMedia(selectedMediaIds)
      deselectAll()
    }}
  >
    <ToolTip tooltip="restore">
      <TealButton size="sm" variant="outline">
        <HStack spacing={1}>
          <RestoreIcon />
          <Text children={"Restore"} />
        </HStack>
      </TealButton>
    </ToolTip>
  </HStack>
)

export default RestoreItem
