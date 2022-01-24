import React from "react"

import { Box } from "@chakra-ui/react"

import {
  ReferenceBody,
  ReferenceDisplayTitle,
  ReferenceHeader,
  ReferenceItemBox,
} from "../../componentsLayout/mainDisplay/context/references/styles"
import { getImageServerUrl } from "../../privates"
import { MediumItem } from "../../types"
import ImageCard from "../imageCard"
import { ReferenceCardProps } from "./types"

const ReferenceCard = ({
  selectedReferenceIds,
  reference,
  selectionHandler,
  contentSize,
  bodyCellRatio,
  getMediaById,
  mediaTransparency,
  mediaWhiteReplacement,
  mediaHeaderRatio,
  mediaBadges,
}: ReferenceCardProps) => (
  <ReferenceItemBox checked={selectedReferenceIds.includes(reference.id)} onClick={selectionHandler(reference.id)}>
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
)

export default ReferenceCard
