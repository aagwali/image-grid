import { add, prop } from "rambda"
import React, { useReducer } from "react"
import { useLocation } from "react-router-dom"

import { Stack } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../components/dynamicGrid"
import ImageCard from "../../../components/imageCard"
import { getImageServerUrl } from "../../../privates"
import { mediaDisplaySlice, mediaFilteredSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import MediaDisplayLeftBar from "./leftBar"
import { getSelectedMedia } from "./privates"
import MediaDisplayRightBar from "./rightBar"
import { LogoBox, MediaBox } from "./styles"

const MediaDisplay = (_: any) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectedMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges, whiteReplacement } =
    getState(prop("mediaDisplay"))

  const filteredMedia = getState((x) => mediaFilteredSelector(x, location.search))
  const filteredMediaIds = filteredMedia.map(prop("id"))
  const [headerCellRatio, headerRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const isBin = useLocation().search.includes("bin")

  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (medium: typeof selectedMediaIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateMediaDisplay({
        selectedMediaIds: getSelectedMedia(selectedMediaIds, filteredMediaIds, medium, event),
      }),
    )
  const openLightBox = (mediumId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediumId: mediumId }))
  }

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <Stack spacing={0} direction="row">
      <MediaDisplayLeftBar forceUpdate={forceUpdate} />

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

      <MediaDisplayRightBar />
    </Stack>
  )
}

export default MediaDisplay
