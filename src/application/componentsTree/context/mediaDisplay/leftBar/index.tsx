import debounce from "debounce"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Accordion, Box, Stack, Text } from "@chakra-ui/react"

import AppToolTip from "../../../../components/appTooltip"
import SizeSlider from "../../../../components/dynamicGrid/sizeSlider"
import { getBadgeLabel } from "../../../../components/imageCard/privates"
import { CardBadge, Ellipsis } from "../../../../components/imageCard/styles"
import PanelItems from "../../../../components/panelItems"
import { getHotkeys } from "../../../../privates"
import { Separator, SideBar } from "../styles"
import { LeftBarShortcuts } from "../types"
import { ControlFilters } from "./controlFilter"
import { ImagesInformations } from "./ImagesInformations"
import { ImagesSize } from "./imagesSize"
import { getContainerProps } from "./privates"
import { QualityFilters } from "./qualityFilter"
import { TextFilter } from "./textFilter"

export const FilterItem = ({ itemsByFilterData, item }: any) => (
  <Box
    style={{
      width: "140px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <AppToolTip tooltip={item}>
      <CardBadge size={225} badge={item}>
        <Ellipsis size={225}> {getBadgeLabel(item)} </Ellipsis>
      </CardBadge>
    </AppToolTip>

    <CardBadge size={200}>
      <Text children={itemsByFilterData[item]?.length ?? 0} />
    </CardBadge>
  </Box>
)

const MediaDisplayLeftBar = ({ forceUpdate }: any) => {
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
        <PanelItems title={"Display options"}>
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
        </PanelItems>

        <PanelItems title={"Filters"}>
          <Stack spacing={4}>
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
        </PanelItems>
      </Accordion>
    </SideBar>
  )
}

export default MediaDisplayLeftBar
