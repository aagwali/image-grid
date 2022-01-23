import React from "react"

import { HStack, Text } from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import { DownloadIcon, RightBarActionBox, TealButton } from "../../styles"
import { downloadMedia } from "./privates"
import { DownloadProps } from "./types"

const DownloadItem = ({ selectedMediaIds, label, deselectAll }: DownloadProps) => (
  <RightBarActionBox
    spacing={1}
    onClick={() => {
      downloadMedia(selectedMediaIds, label)
      deselectAll()
    }}
  >
    <AppToolTip tooltip="download media">
      <TealButton size="sm" variant="outline">
        <HStack spacing={1}>
          <DownloadIcon />
          <Text children={"Download"} />
        </HStack>
      </TealButton>
    </AppToolTip>
  </RightBarActionBox>
)
export default DownloadItem
