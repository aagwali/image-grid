import { add, prop } from "rambda"
import React, { useReducer } from "react"
import Hotkeys from "react-hot-keys"

import { Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicGrid from "../../../dynamicGrid"
import ImageCard from "../../../imageCard"
import { getHotkeys, getImageServerUrl } from "../../../privates"
import { mediaDisplaySlice, mediaSelector } from "../../../reducers"
import { MediumItem } from "../../../types"
import MediaDisplayLeftBar from "./leftBar"
import { getSelectedMedia } from "./privates"
import MediaDisplayRightBar from "./rightBar"
import { LogoBox, MediaBox } from "./styles"
import { MediaDisplayShortcuts } from "./types"

const MediaDisplay = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: mediaLoaded } = getState(prop("media"))
  const { selectMediaIds, transparency, contentSize, scrollRatio, cellMatrix, cardHeader, badges } = getState(
    prop("mediaDisplay"),
  )
  const media = getState(mediaSelector.selectAll)
  const mediaIds = getState(mediaSelector.selectIds) as string[]
  const [headerCellRatio, headearRatio] = cardHeader ? [1.25, 0.25] : [1, 0]
  const badgePadding = badges ? 5 : 0

  const toggleTransparency = () => dispatch(actions.updateMediaDisplay({ transparency: !transparency }))
  const updateScrollRatio = (x: typeof scrollRatio) => dispatch(actions.updateMediaDisplay({ scrollRatio: x }))

  const updateCellMatrix = (x: typeof cellMatrix) => dispatch(actions.updateMediaDisplay({ cellMatrix: x }))
  const selectionHandler = (medium: typeof selectMediaIds[0]) => (event: MouseEvent) =>
    dispatch(actions.updateMediaDisplay({ selectMediaIds: getSelectedMedia(selectMediaIds, mediaIds, medium, event) }))
  const selectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: mediaIds }))
  const deselectAll = () => dispatch(actions.updateMediaDisplay({ selectMediaIds: [] }))
  const openLightBox = (mediumId: string) => (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(actions.updateMediaDisplay({ lightBoxMediumId: mediumId }))
  }

  const handleHotkey = (hotkey: string, event: KeyboardEvent) => {
    event.preventDefault()
    if (hotkey === MediaDisplayShortcuts.Deselect) deselectAll()
    if (hotkey === MediaDisplayShortcuts.SelectAll) selectAll()
    if (hotkey === MediaDisplayShortcuts.Transparency) toggleTransparency()
  }

  const [, forceUpdate] = useReducer(add(1), 0)

  return (
    <Stack spacing={0} direction="row">
      <Hotkeys keyName={getHotkeys(MediaDisplayShortcuts)} onKeyDown={handleHotkey} />

      <MediaDisplayLeftBar forceUpdate={forceUpdate} />

      <MediaBox>
        <LogoBox data-loaded={mediaLoaded}>
          <DynamicGrid
            contentSize={contentSize}
            scrollRatio={scrollRatio}
            updateScrollRatio={updateScrollRatio}
            cellMatrix={cellMatrix}
            updateCellMatrix={updateCellMatrix}
            items={media}
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
                badgePadding={badgePadding}
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
