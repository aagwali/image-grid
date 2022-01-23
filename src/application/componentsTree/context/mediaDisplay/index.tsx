import React from "react"

import { Stack } from "@chakra-ui/react"

import LeftBar from "./leftBar"
import { MediaGrid } from "./mediaGrid"
import { getContainerProps } from "./privates"
import RightBar from "./rightBar"

const MediaDisplay = (_: any) => {
  const {
    mediaLoaded,
    selectedMediaIds,
    transparency,
    contentSize,
    scrollRatio,
    cellMatrix,
    badges,
    whiteReplacement,
    filteredMedia,
    headerCellRatio,
    headerRatio,
    isBin,
    updateScrollRatio,
    updateCellMatrix,
    selectionHandler,
    openLightBox,
    forceUpdate,
  } = getContainerProps()

  return (
    <Stack spacing={0} direction="row">
      <LeftBar forceUpdate={forceUpdate} />

      <MediaGrid
        isBin={isBin}
        mediaLoaded={mediaLoaded}
        contentSize={contentSize}
        scrollRatio={scrollRatio}
        updateCellMatrix={updateCellMatrix}
        updateScrollRatio={updateScrollRatio}
        cellMatrix={cellMatrix}
        filteredMedia={filteredMedia}
        headerCellRatio={headerCellRatio}
        transparency={transparency}
        selectedMediaIds={selectedMediaIds}
        whiteReplacement={whiteReplacement}
        openLightBox={openLightBox}
        selectionHandler={selectionHandler}
        headerRatio={headerRatio}
        badges={badges}
        forceUpdate={forceUpdate}
      />

      <RightBar />
    </Stack>
  )
}

export default MediaDisplay
