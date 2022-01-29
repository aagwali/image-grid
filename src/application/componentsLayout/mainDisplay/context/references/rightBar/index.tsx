import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, Stack } from "@chakra-ui/react"

import AccordionItem from "../../../../../components/accordionItem"
import DeselectAllItem from "../../../../../components/deselectAllItem"
import SelectAllItem from "../../../../../components/selectAllItem"
import { getHotkeys } from "../../../../../privates"
import { SeparatorBox, SideBarBox } from "../styles"
import { RightBarShortcuts } from "../types"
import Dissociate from "./dissociate"
import { getContainerProps } from "./privates"

const ReferenceRightBar = () => {
  const {
    selectedReferenceIds,
    filteredReferencesIds,
    selectionExists,
    selectAll,
    deselectAll,
    dissociate,
    handleHotkey,
  } = getContainerProps()

  return (
    <SideBarBox>
      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />

      <SeparatorBox />
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem title={`Selection ${selectedReferenceIds.length} / ${filteredReferencesIds.length}`}>
          <Stack mt={0} spacing={4}>
            <SelectAllItem selectAll={selectAll} entity={"references"} />

            <DeselectAllItem selectionExists={selectionExists} deselectAll={deselectAll} entity={"references"} />
          </Stack>
        </AccordionItem>

        {selectionExists && (
          <AccordionItem title={"Actions"}>
            <Stack mt={0} spacing={4}>
              <Dissociate dissociate={dissociate} deselectAll={deselectAll} />
            </Stack>
          </AccordionItem>
        )}
      </Accordion>
    </SideBarBox>
  )
}

export default ReferenceRightBar
