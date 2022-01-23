import React from "react"

import DynamicGrid from "../../../../components/dynamicGrid"
import ImageCard from "../../../../components/imageCard"
import { getImageServerUrl } from "../../../../privates"
import { MediumItem } from "../../../../types"
import { LogoBox, MediaBox } from "../styles"
import { MediaGridProps } from "./types"

export const MediaGrid = ({
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
  forceUpdate,
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
        renderItem={(medium: MediumItem) => (
          <ImageCard
            title={medium.fileName}
            subtitle={`${medium.width} x ${medium.height}`}
            transparency={transparency}
            imageSize={contentSize}
            checked={selectedMediaIds.includes(medium.id)}
            getUrlBySize={(size: number) => getImageServerUrl(medium.id, size, whiteReplacement)} // cf. paddedSize
            openLightBox={openLightBox(medium.id)}
            selectionHandler={selectionHandler(medium.id)}
            status={medium.status}
            headerHeightRatio={headerRatio}
            controlId={medium.controlId}
            badges={badges}
          />
        )}
        forceUpdate={forceUpdate}
      />
    </LogoBox>
  </MediaBox>
)
