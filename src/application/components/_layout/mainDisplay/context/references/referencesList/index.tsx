import React from "react"

import { ReferenceItem } from "../../../../../../types"
import DynamicList from "../../../../../dynamicList"
import ImageCard from "../../../../../imageCard"
import ReferenceCard from "../../../../../referencesCard"
import { LogoBox, ReferencesBox } from "../styles"
import { ReferenceListProps } from "./types"

const ReferencesList = ({
  referencesLoaded,
  references,
  contentSize,
  headerCellRatio,
  selectedReferenceIds,
  setSelection,
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
            setSelection={setSelection}
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
