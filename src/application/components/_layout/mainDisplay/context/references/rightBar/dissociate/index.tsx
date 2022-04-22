import React from "react"

import { HStack, Text } from "@chakra-ui/react"

import ToolTip from "../../../../../../tooltip"
import { TealButton } from "../../../styles"
import { RestoreIcon } from "./styles"
import { DissociateProps } from "./types"

const Dissociate = ({ dissociate, deselectAll }: DissociateProps) => (
  <HStack
    spacing={1}
    onClick={() => {
      dissociate()
      deselectAll()
    }}
  >
    <ToolTip tooltip="dissociate content">
      <TealButton size="sm" variant="outline">
        <HStack spacing={1}>
          <RestoreIcon />
          <Text children={"Dissociate"} />
        </HStack>
      </TealButton>
    </ToolTip>
  </HStack>
)

export default Dissociate
