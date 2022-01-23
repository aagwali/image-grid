import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import AppToolTip from "../../../../../components/appTooltip"
import { DisplayCheckboxGroup, LeftBarLabel, LeftBarLabelTitle } from "../../styles"
import { ImagesInformationsProps } from "./types"

export const ImagesInformations = ({
  allCheckedDisplay,
  badges,
  isIndeterminateDisplay,
  transparency,
  cardHeader,
  whiteReplacement,
  toggleDisplayOptions,
  toggleCardHeader,
  toggleCardBadges,
  toggleTransparency,
  toggleWhiteClipping,
}: ImagesInformationsProps) => (
  <DisplayCheckboxGroup>
    <Checkbox
      size={"sm"}
      isChecked={allCheckedDisplay}
      isIndeterminate={isIndeterminateDisplay}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleDisplayOptions(e.target.checked)}
    >
      <LeftBarLabelTitle children={"Images information"} />
    </Checkbox>
    <Stack pl={6} spacing={1}>
      <Checkbox isChecked={cardHeader} size={"sm"} onChange={toggleCardHeader}>
        <AppToolTip tooltip="filename">
          <LeftBarLabel children={"Media info"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
        <AppToolTip tooltip="badges">
          <LeftBarLabel children={"Badges"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
        <AppToolTip tooltip="transparency">
          <LeftBarLabel children={"Transparency"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={whiteReplacement} size={"sm"} onChange={toggleWhiteClipping}>
        <AppToolTip tooltip="clipping">
          <LeftBarLabel children={"White clipping"} />
        </AppToolTip>
      </Checkbox>
    </Stack>
  </DisplayCheckboxGroup>
)
