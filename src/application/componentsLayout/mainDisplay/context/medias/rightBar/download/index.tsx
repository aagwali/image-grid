import React from "react"

import { HStack, Text } from "@chakra-ui/react"

import ToolTip from "../../../../../../components/tooltip"
import { TealButton } from "../../../styles"
import { downloadMedia } from "./privates"
import { DownloadIcon } from "./styles"
import { DownloadProps } from "./types"

const DownloadItem = ({ selectedMediaIds, label, deselectAll }: DownloadProps) => (
  <HStack
    spacing={1}
    onClick={() => {
      downloadMedia(selectedMediaIds, label)
      deselectAll()
    }}
  >
    <ToolTip tooltip="download media">
      <TealButton size="sm" variant="outline">
        <HStack spacing={1}>
          <DownloadIcon />
          <Text children={"Download"} />
        </HStack>
      </TealButton>
    </ToolTip>
  </HStack>
)
export default DownloadItem
