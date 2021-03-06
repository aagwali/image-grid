import React from "react"

import { Stack } from "@chakra-ui/react"

import LeftBar from "./leftBar"
import MediasGrid from "./mediasGrid"
import { getContainerProps } from "./privates"
import RightBar from "./rightBar"

const MediaDisplay = () => {
  const {
    mediaLoaded,
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
    userBadges,
    updateScrollRatio,
    updateCellMatrix,
    setSelection,
    openLightBox,
    forceUpdate,
    setUserBadge,
  } = getContainerProps()

  return (
    <Stack spacing={0} direction="row">
      <LeftBar forceUpdate={forceUpdate} />

      <MediasGrid
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
        whiteReplacement={whiteReplacement}
        openLightBox={openLightBox}
        setSelection={setSelection}
        headerRatio={headerRatio}
        badges={badges}
        userBadges={userBadges}
        forceUpdate={forceUpdate}
        setUserBadge={setUserBadge}
      />

      <RightBar />
    </Stack>
  )
}

export default MediaDisplay
