import React from "react"

import { Stack } from "@chakra-ui/react"

import LeftBar from "./leftBar"
import { getContainerProps } from "./privates"
import ReferencesList from "./referencesList"
import RightBar from "./rightBar"

const ReferencesDisplay = () => {
  const {
    referencesLoaded,
    references,
    mediaBadges,
    mediaTransparency,
    mediaWhiteReplacement,
    contentSize,
    selectedReferenceIds,
    mediaHeaderRatio,
    headerCellRatio,
    bodyCellRatio,
    selectionHandler,
    getMediaById,
    forceUpdate,
  } = getContainerProps()

  return (
    <Stack spacing={0} direction="row">
      <LeftBar forceUpdate={forceUpdate} />

      <ReferencesList
        referencesLoaded={referencesLoaded}
        references={references}
        contentSize={contentSize}
        headerCellRatio={headerCellRatio}
        selectedReferenceIds={selectedReferenceIds}
        selectionHandler={selectionHandler}
        bodyCellRatio={bodyCellRatio}
        getMediaById={getMediaById}
        mediaTransparency={mediaTransparency}
        mediaWhiteReplacement={mediaWhiteReplacement}
        mediaHeaderRatio={mediaHeaderRatio}
        mediaBadges={mediaBadges}
      />

      <RightBar />
    </Stack>
  )
}

export default ReferencesDisplay
