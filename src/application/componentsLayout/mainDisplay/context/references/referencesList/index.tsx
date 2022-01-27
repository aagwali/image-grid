import React from "react"

import DynamicList from "../../../../../components/dynamicList"
import ImageCard from "../../../../../components/imageCard"
import ReferenceCard from "../../../../../components/referencesCard"
import { ReferenceItem } from "../../../../../types"
import { LogoBox, ReferencesBox } from "../styles"
import { ReferenceListProps } from "./types"

const ReferencesList = ({
  referencesLoaded,
  references,
  contentSize,
  headerCellRatio,
  selectedReferenceIds,
  selectionHandler,
  bodyCellRatio,
  getMediaById,
  mediaTransparency,
  mediaWhiteReplacement,
  mediaHeaderRatio,
  mediaBadges,
  userBadges,
}: ReferenceListProps) => (
  <ReferencesBox>
    <LogoBox loaded={referencesLoaded.toString()}>
      <DynamicList
        items={references}
        itemsLoaded={referencesLoaded}
        contentSize={contentSize}
        headerHeightRatio={headerCellRatio}
        renderItem={(reference: ReferenceItem) => (
          <ReferenceCard
            selectedReferenceIds={selectedReferenceIds}
            reference={reference}
            selectionHandler={selectionHandler}
            contentSize={contentSize}
            bodyCellRatio={bodyCellRatio}
            getMediaById={getMediaById}
            mediaTransparency={mediaTransparency}
            mediaWhiteReplacement={mediaWhiteReplacement}
            mediaHeaderRatio={mediaHeaderRatio}
            mediaBadges={mediaBadges}
            userBadges={userBadges}
          />
        )}
      />
    </LogoBox>
  </ReferencesBox>
)

export default ReferencesList
