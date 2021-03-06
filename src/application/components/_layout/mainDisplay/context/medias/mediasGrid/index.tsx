import React from "react"

import { getImageServerUrl } from "../../../../../../privates"
import { MediaItem } from "../../../../../../types"
import DynamicGrid from "../../../../../dynamicGrid"
import ImageCard from "../../../../../imageCard"
import ProgressiveRender from "../../../../../progressiveRender"
import { LogoBox, MediaBox } from "./styles"
import { MediaGridProps } from "./types"

const MediasGrid = ({
  isBin,
  mediaLoaded,
  contentSize,
  scrollRatio,
  updateCellMatrix,
  updateScrollRatio,
  cellMatrix,
  filteredMedia,
  headerCellRatio,
  transparency,
  whiteReplacement,
  openLightBox,
  setSelection,
  headerRatio,
  badges,
  userBadges,
  forceUpdate,
  setUserBadge,
}: MediaGridProps) => (
  <MediaBox bin={isBin.toString()}>
    <LogoBox bin={isBin.toString()} loaded={mediaLoaded.toString()}>
      <DynamicGrid
        contentSize={contentSize}
        scrollRatio={scrollRatio}
        updateScrollRatio={updateScrollRatio}
        cellMatrix={cellMatrix}
        updateCellMatrix={updateCellMatrix}
        items={filteredMedia}
        itemsLoaded={mediaLoaded}
        headerHeightRatio={headerCellRatio}
        renderItem={(media: MediaItem) => (
          <ProgressiveRender>
            <ImageCard
              mediaId={media.id}
              title={media.fileName}
              subtitle={`${media.width} x ${media.height}`}
              transparency={transparency}
              imageSize={contentSize}
              checked={userBadges[media.id]?.selected ?? false}
              status={media.status}
              headerHeightRatio={headerRatio}
              controlId={media.controlId}
              badges={badges}
              userBadge={userBadges[media.id]}
              whiteReplacement={whiteReplacement}
              getUrlBySize={(whiteReplacement: boolean, size: number) =>
                getImageServerUrl(media.id, size, whiteReplacement)
              }
              openLightBox={openLightBox}
              setSelection={setSelection}
              setUserBadge={setUserBadge}
            />
          </ProgressiveRender>
        )}
        forceUpdate={forceUpdate}
      />
    </LogoBox>
  </MediaBox>
)

export default MediasGrid
