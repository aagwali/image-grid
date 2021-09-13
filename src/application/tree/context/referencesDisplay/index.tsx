import { identity, prop } from "rambda"
import React from "react"

import { Box, Stack } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicList from "../../../dynamicList"
import ImageCard from "../../../imageCard"
import { getImageServerUrl } from "../../../privates"
import { mediaDisplaySlice, mediaSelector, referencesSelector } from "../../../reducers"
import { MediumItem, ReferenceItem } from "../../../types"
import MediaDisplayLeftBar from "./leftBar"
import MediaDisplayRightBar from "./rightBar"
import {
  LogoBox,
  ReferenceBody,
  ReferenceDisplayTitle,
  ReferenceHeader,
  ReferenceItemBox,
  ReferencesBox,
} from "./styles"

const ReferencesDisplay = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaDisplaySlice

  const { loaded: referencesLoaded } = getState(prop("references"))
  const { mediaBadges, mediaTransparency, mediaWhiteReplacement, mediaCardHeader, contentSize } = getState(
    prop("referencesDisplay"),
  )
  const mediaHeaderRatio = mediaCardHeader ? 0.25 : 0
  const headerCellRatio = mediaCardHeader ? 1.93 : 1.68
  const bodyCellRatio = mediaCardHeader ? 1.35 : 1.1

  const references = getState(referencesSelector.selectAll)
  const state = getState(identity)

  const getMediaById = (mediumId: string) => mediaSelector.selectById(state, mediumId)

  return (
    <Stack spacing={0} direction="row">
      <MediaDisplayLeftBar />

      <ReferencesBox>
        <LogoBox loaded={referencesLoaded.toString()}>
          <DynamicList
            items={references}
            itemsLoaded={referencesLoaded}
            contentSize={contentSize}
            headerHeightRatio={headerCellRatio}
            renderItem={(reference: ReferenceItem) => (
              <ReferenceItemBox>
                <ReferenceHeader>
                  <ReferenceDisplayTitle children={reference.id} />
                </ReferenceHeader>

                <ReferenceBody spacing={0} size={contentSize} ratio={bodyCellRatio}>
                  {reference.mediaAssociations.map((association) => {
                    const medium = getMediaById(association.msMediaId) as MediumItem

                    return (
                      <Box w="100px">
                        <ImageCard
                          key={association.msMediaId}
                          title={medium.fileName}
                          subtitle={`${medium.width} x ${medium.height}`}
                          transparency={mediaTransparency}
                          imageSize={contentSize}
                          checked={false}
                          getUrlBySize={(size: number) => getImageServerUrl(medium.id, size, mediaWhiteReplacement)} // cf. paddedSize
                          openLightBox={() => {}}
                          selectionHandler={() => {}}
                          status={medium.status}
                          headerHeightRatio={mediaHeaderRatio}
                          controlId={medium.controlId}
                          badges={mediaBadges}
                        />
                      </Box>
                    )
                  })}
                </ReferenceBody>
              </ReferenceItemBox>
            )}
          />
        </LogoBox>
      </ReferencesBox>

      <MediaDisplayRightBar />
    </Stack>
  )
}

export default ReferencesDisplay
