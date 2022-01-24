import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { AccordionItemSubTitle, AccordionItemTitle } from "../../../../../components/appAccordionItem/styles"
import AppToolTip from "../../../../../components/appTooltip"
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
  <Stack spacing={2}>
    <Checkbox
      size={"sm"}
      isChecked={allCheckedDisplay}
      isIndeterminate={isIndeterminateDisplay}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleDisplayOptions(e.target.checked)}
    >
      <AccordionItemTitle children={"Images information"} />
    </Checkbox>
    <Stack pl={6} spacing={1}>
      <Checkbox isChecked={cardHeader} size={"sm"} onChange={toggleCardHeader}>
        <AppToolTip tooltip="filename">
          <AccordionItemSubTitle children={"Media info"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
        <AppToolTip tooltip="badges">
          <AccordionItemSubTitle children={"Badges"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
        <AppToolTip tooltip="transparency">
          <AccordionItemSubTitle children={"Transparency"} />
        </AppToolTip>
      </Checkbox>
      <Checkbox isChecked={whiteReplacement} size={"sm"} onChange={toggleWhiteClipping}>
        <AppToolTip tooltip="clipping">
          <AccordionItemSubTitle children={"White clipping"} />
        </AppToolTip>
      </Checkbox>
    </Stack>
  </Stack>
)
