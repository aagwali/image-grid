import React from "react"

import { Checkbox, Stack } from "@chakra-ui/react"

import { AccordionItemSubTitle, AccordionItemTitle } from "../../../../../../components/accordionItem/styles"
import ToolTip from "../../../../../../components/tooltip"
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
        <ToolTip tooltip="filename">
          <AccordionItemSubTitle children={"Media info"} />
        </ToolTip>
      </Checkbox>
      <Checkbox isChecked={badges} size={"sm"} onChange={toggleCardBadges}>
        <ToolTip tooltip="badges">
          <AccordionItemSubTitle children={"Badges"} />
        </ToolTip>
      </Checkbox>
      <Checkbox isChecked={transparency} size={"sm"} onChange={toggleTransparency}>
        <ToolTip tooltip="transparency">
          <AccordionItemSubTitle children={"Transparency"} />
        </ToolTip>
      </Checkbox>
      <Checkbox isChecked={whiteReplacement} size={"sm"} onChange={toggleWhiteClipping}>
        <ToolTip tooltip="clipping">
          <AccordionItemSubTitle children={"White clipping"} />
        </ToolTip>
      </Checkbox>
    </Stack>
  </Stack>
)
