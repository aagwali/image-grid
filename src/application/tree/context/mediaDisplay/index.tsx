import { add, prop } from "rambda"
import React, { useReducer } from "react"
import styled from "styled-components"

import { Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../dynamicGrid"
import ImageCard from "../../../imageCard"
import { getImageServerUrl } from "../../../privates"
import { mediaDisplaySlice, mediaSelector, mediaStatusFilterSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import MediaDisplayLeftBar from "./leftBar"
import { getSelectedMedia } from "./privates"
import MediaDisplayRightBar from "./rightBar"
import { LogoBox, MediaBox } from "./styles"

const MediaDisplay = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges } = getState(
    prop("mediaDisplay"),
  )

  const filteredMedia = getState((x) => mediaStatusFilterSelector(x, props))

  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [headerCellRatio, headearRatio] = cardHeader ? [1.25, 0.25] : [1, 0]

  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (medium: typeof selectMediaIds[0]) => (event: MouseEvent) =>
    dispatch(actions.updateMediaDisplay({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))
  const openLightBox = (mediumId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediumId: mediumId }))
  }

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <Stack spacing={0} direction="row">
      <MediaDisplayLeftBar forceUpdate={forceUpdate} />

      <MediaBox>
        <LogoBox loaded={mediaLoaded ? "true" : "false"}>
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
                checked={selectMediaIds.includes(medium.id)}
                getUrlBySize={(size: number) => getImageServerUrl(medium.id, size)} // cf. paddedSize
                openLightBox={openLightBox(medium.id)}
                selectionHandler={selectionHandler(medium.id)}
                status={medium.status}
                headerHeightRatio={headearRatio}
                controlId={medium.controlId}
                badges={badges}
              />
            )}
            forceUpdate={forceUpdate}
          />
        </LogoBox>
      </MediaBox>

      <MediaDisplayRightBar />
    </Stack>
  )
}

export default MediaDisplay
