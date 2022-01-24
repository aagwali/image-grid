import { identity, prop } from "rambda"
import React from "react"

import { Box, Stack } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import DynamicList from "../../../components/dynamicList"
import ImageCard from "../../../components/imageCard"
import { getImageServerUrl } from "../../../privates"
import { MediumItem, ReferenceItem } from "../../../types"
import { mediaSelector } from "../medias/reducers"
import ReferenceDisplayLeftBar from "./leftBar"
import { getSelectedReferences } from "./privates"
import { referencesDisplaySlice, referencesSelector } from "./reducers"
import ReferenceDisplayRightBar from "./rightBar"
import {
  LogoBox,
  ReferenceBody,
  ReferenceDisplayTitle,
  ReferenceHeader,
  ReferenceItemBox,
  ReferencesBox,
} from "./styles"

const ReferencesDisplay = (_: any) => {
  const dispatch = useAppDispatch()
  const { actions } = referencesDisplaySlice

  const { loaded: referencesLoaded } = getState(prop("references"))
  const { mediaBadges, mediaTransparency, mediaWhiteReplacement, mediaCardHeader, contentSize, selectedReferenceIds } =
    getState(prop("referencesDisplay"))
  const references = getState(referencesSelector.selectAll)
  const state = getState(identity)

  const mediaHeaderRatio = mediaCardHeader ? 0.25 : 0
  const headerCellRatio = mediaCardHeader ? 2 : 1.75
  const bodyCellRatio = mediaCardHeader ? 1.35 : 1.1

  const filteredReferencesIds = references.map(prop("id"))

  const selectionHandler = (referenceId: typeof selectedReferenceIds[0]) => (event: MouseEvent) =>
    dispatch(
      actions.updateReferencesDisplay({
        selectedReferenceIds: getSelectedReferences(selectedReferenceIds, filteredReferencesIds, referenceId, event),
      }),
    )

  const getMediaById = (mediumId: string) => mediaSelector.selectById(state, mediumId)

  return (
    <Stack spacing={0} direction="row">
      <ReferenceDisplayLeftBar />

      <ReferencesBox>
        <LogoBox loaded={referencesLoaded.toString()}>
          <DynamicList
            items={references}
            itemsLoaded={referencesLoaded}
            contentSize={contentSize}
            headerHeightRatio={headerCellRatio}
            renderItem={(reference: ReferenceItem) => (
              <ReferenceItemBox
                checked={selectedReferenceIds.includes(reference.id)}
                onClick={selectionHandler(reference.id)}
              >
                <ReferenceHeader className="referenceHeader">
                  <ReferenceDisplayTitle children={reference.familyId} />
                </ReferenceHeader>

                <ReferenceBody spacing={0} size={contentSize} ratio={bodyCellRatio}>
                  {reference.mediaAssociations.map((association) => {
                    const medium = getMediaById(association.msMediaId) as MediumItem

                    return (
                      <Box w="100px" key={association.msMediaId}>
                        <ImageCard
                          title={medium.fileName}
                          subtitle={`${medium.width} x ${medium.height}`}
                          transparency={mediaTransparency}
                          imageSize={contentSize}
                          checked={false}
                          getUrlBySize={(size: number) => getImageServerUrl(medium.id, size, mediaWhiteReplacement)} // cf. paddedSize
                          openLightBox={() => {}}
                          selectionHandler={(e) => {
                            e.stopPropagation()
                          }}
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

      <ReferenceDisplayRightBar />
    </Stack>
  )
}

export default ReferencesDisplay
