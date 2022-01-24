import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, Stack } from "@chakra-ui/react"

import AccordionItem from "../../../../../components/accordionItem"
import { getHotkeys } from "../../../../../privates"
import { Separator, SideBar } from "../../styles"
import { LeftBarShortcuts } from "../types"
import { ControlFilters } from "./controlFilter"
import { ImagesInformations } from "./ImagesInformations"
import { ImagesSize } from "./imagesSize"
import { getContainerProps } from "./privates"
import { QualityFilters } from "./qualityFilter"
import { TextFilter } from "./textFilter"

const MediaLeftBar = ({ forceUpdate }: any) => {
  const {
    search,
    transparency,
    contentSize,
    cardHeader,
    badges,
    whiteReplacement,
    itemsByFilterData,
    allCheckedDisplay,
    isIndeterminateDisplay,
    allCheckedQualityFilters,
    isIndeterminateQualityFilters,
    controlIsIndeterminate,
    inputSearch,
    toggleCardHeader,
    toggleCardBadges,
    toggleDisplayOptions,
    toggleTransparency,
    toggleWhiteClipping,
    updateContentSize,
    updateCellMatrix,
    updateFilter,
    setInputSearch,
    handleHotkey,
  } = getContainerProps()

  return (
    <SideBar>
      <Hotkeys keyName={getHotkeys(LeftBarShortcuts)} onKeyDown={handleHotkey} />

      <Separator />
      <Accordion allowToggle>
        <AccordionItem title={"Display options"}>
          <Stack mt={3} spacing={8}>
            <ImagesSize
              contentSize={contentSize}
              updateContentSize={updateContentSize}
              updateCellMatrix={updateCellMatrix}
              forceUpdate={forceUpdate}
            />

            <ImagesInformations
              allCheckedDisplay={allCheckedDisplay}
              badges={badges}
              isIndeterminateDisplay={isIndeterminateDisplay}
              transparency={transparency}
              cardHeader={cardHeader}
              whiteReplacement={whiteReplacement}
              toggleDisplayOptions={toggleDisplayOptions}
              toggleCardHeader={toggleCardHeader}
              toggleCardBadges={toggleCardBadges}
              toggleTransparency={toggleTransparency}
              toggleWhiteClipping={toggleWhiteClipping}
            />
          </Stack>
        </AccordionItem>

        <AccordionItem title={"Filters"}>
          <Stack spacing={6}>
            <TextFilter
              inputSearch={inputSearch}
              search={search}
              setInputSearch={setInputSearch}
              updateFilter={updateFilter}
            />

            <QualityFilters
              allCheckedQualityFilters={allCheckedQualityFilters}
              isIndeterminateQualityFilters={isIndeterminateQualityFilters}
              updateFilter={updateFilter}
              search={search}
              itemsByFilterData={itemsByFilterData}
            />

            <ControlFilters
              controlIsIndeterminate={controlIsIndeterminate}
              search={search}
              itemsByFilterData={itemsByFilterData}
              updateFilter={updateFilter}
            />
          </Stack>
        </AccordionItem>
      </Accordion>
    </SideBar>
  )
}

export default MediaLeftBar
