import React from "react"

import DynamicGrid from "../../../../../components/dynamicGrid"
import ImageCard from "../../../../../components/imageCard"
import ProgressiveRender from "../../../../../components/progressiveRender"
import { getImageServerUrl } from "../../../../../privates"
import { MediaItem } from "../../../../../types"
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
  selectedMediaIds,
  whiteReplacement,
  openLightBox,
  selectionHandler,
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
              title={media.fileName}
              subtitle={`${media.width} x ${media.height}`}
              transparency={transparency}
              imageSize={contentSize}
              checked={selectedMediaIds.includes(media.id)}
              getUrlBySize={(size: number) => getImageServerUrl(media.id, size, whiteReplacement)} // cf. paddedSize
              openLightBox={openLightBox(media.id)}
              selectionHandler={selectionHandler(media.id)}
              status={media.status}
              headerHeightRatio={headerRatio}
              controlId={media.controlId}
              badges={badges}
              userBadge={userBadges[media.id]}
              setUserBadge={setUserBadge(media.id)}
            />
          </ProgressiveRender>
        )}
        forceUpdate={forceUpdate}
      />
    </LogoBox>
  </MediaBox>
)

export default MediasGrid
