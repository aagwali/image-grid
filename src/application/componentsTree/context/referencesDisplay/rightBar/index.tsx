import { isEmpty, prop } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"
import { useLocation } from "react-router-dom"

import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, HStack, Stack, Text } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../../storeConfig"
import AppToolTip from "../../../../components/appTooltip"
import DropZone from "../../../../components/dropzone"
import { getHotkeys } from "../../../../privates"
import { mediaByFilterSelector, referencesDisplaySlice, referencesSelector } from "../../../../reducers"
import { triggerPatchReference } from "../../../../services"
import {
  AccordionButtonBox,
  DeselectAllIcon,
  DownloadIcon,
  ReferenceDisplayTitle,
  RightBarAction,
  RightBarActionBox,
  SelectAllIcon,
  SeparatorBox,
  SideBarBox,
  TealButton,
} from "../styles"
import { RightBarShortcuts } from "../types"

const ReferenceDisplayRightBar = () => {
  const dispatch = useAppDispatch()
  const { actions } = referencesDisplaySlice
  const location = useLocation()

  const { selectedReferenceIds } = getState(prop("referencesDisplay"))
  const { label } = getState(prop("context"))
  const itemsByFilterData = getState(mediaByFilterSelector)

  const filteredReferences = getState(referencesSelector.selectAll)
  const filteredReferencesIds = filteredReferences.map(prop("id"))

  const selectionExists = !isEmpty(selectedReferenceIds)

  const selectAll = () => dispatch(actions.updateReferencesDisplay({ selectedReferenceIds: filteredReferencesIds }))
  const deselectAll = () => dispatch(actions.updateReferencesDisplay({ selectedReferenceIds: [] }))

  const [patchReference] = triggerPatchReference.useMutation()
  const dissociate = () => patchReference({ referenceIds: selectedReferenceIds, value: { mediaAssociations: [] } })

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === RightBarShortcuts.Deselect) deselectAll()
    if (hotkey === RightBarShortcuts.SelectAll) selectAll()
  }

  return (
    <SideBarBox>
      <SeparatorBox />

      <Hotkeys keyName={getHotkeys(RightBarShortcuts)} onKeyDown={handleHotkey} />
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem borderWidth={0}>
          <AccordionButtonBox>
            <AccordionIcon />
            <ReferenceDisplayTitle
              flex="1"
              textAlign="left"
              children={`Selection ${selectedReferenceIds.length} / ${filteredReferencesIds.length}`}
            />
          </AccordionButtonBox>
          <AccordionPanel>
            <Stack mt={0} spacing={4}>
              <RightBarActionBox spacing={1} onClick={selectAll}>
                <SelectAllIcon />
                <AppToolTip tooltip="selectAll">
                  <RightBarAction children={"Select all references"} />
                </AppToolTip>
              </RightBarActionBox>
              <RightBarActionBox enabled={selectionExists ? "true" : "false"} spacing={1} onClick={deselectAll}>
                <DeselectAllIcon />
                <AppToolTip tooltip="deselectAll">
                  <RightBarAction children={"Deselect all references"} />
                </AppToolTip>
              </RightBarActionBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        {selectionExists && (
          <AccordionItem borderWidth={0}>
            <AccordionButtonBox>
              <AccordionIcon />
              <ReferenceDisplayTitle flex="1" textAlign="left" children={"Actions"} />
            </AccordionButtonBox>
            <AccordionPanel>
              <Stack mt={0} spacing={4}>
                <RightBarActionBox
                  spacing={1}
                  onClick={() => {
                    dissociate()
                    deselectAll()
                  }}
                >
                  <AppToolTip tooltip="dissociate content">
                    <TealButton size="sm" variant="outline">
                      <HStack spacing={1}>
                        <DownloadIcon />
                        <Text children={"Dissociate medias"} />
                      </HStack>
                    </TealButton>
                  </AppToolTip>
                </RightBarActionBox>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </SideBarBox>
  )
}

export default ReferenceDisplayRightBar
