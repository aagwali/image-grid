import React from "react"

import { HStack, Text } from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import { RestoreIcon, RightBarActionBox, TealButton } from "../../styles"
import { RestoreProps } from "./types"

const RestoreItem = ({ selectedMediaIds, restoreMedia, deselectAll }: RestoreProps) => (
  <RightBarActionBox
    spacing={1}
    onClick={() => {
      restoreMedia(selectedMediaIds)
      deselectAll()
    }}
  >
    <AppToolTip tooltip="restore">
      <TealButton size="sm" variant="outline">
        <HStack spacing={1}>
          <RestoreIcon />
          <Text children={"Restore"} />
        </HStack>
      </TealButton>
    </AppToolTip>
  </RightBarActionBox>
)

export default RestoreItem
