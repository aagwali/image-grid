import React from "react"

import { Box } from "@chakra-ui/react"

import { getImageServerUrl } from "../../privates"
import { MediaItem } from "../../types"
import {
  ReferenceBody,
  ReferenceDisplayTitle,
  ReferenceHeader,
  ReferenceItemBox,
} from "../_layout/mainDisplay/context/references/styles"
import ImageCard from "../imageCard"
import { ReferenceCardProps } from "./types"

const ReferenceCard = ({
  selectedReferenceIds,
  reference,
  setSelection,
  contentSize,
  bodyCellRatio,
  getMediaById,
  mediaTransparency,
  mediaWhiteReplacement,
  mediaHeaderRatio,
  mediaBadges,
  userBadges,
}: ReferenceCardProps) => (
  <ReferenceItemBox checked={selectedReferenceIds.includes(reference.id)} onClick={setSelection(reference.id)}>
    <ReferenceHeader className="referenceHeader">
      <ReferenceDisplayTitle children={reference.familyId} />
    </ReferenceHeader>

    <ReferenceBody spacing={0} size={contentSize} ratio={bodyCellRatio}>
      {reference.mediaAssociations.map((association) => {
        const media = getMediaById(association.msMediaId) as MediaItem

        return (
          <Box w="100px" key={association.msMediaId}>
            <ImageCard
              mediaId={media.id}
              title={media.fileName}
              subtitle={`${media.width} x ${media.height}`}
              transparency={mediaTransparency}
              imageSize={contentSize}
              checked={false}
              whiteReplacement={mediaWhiteReplacement}
              getUrlBySize={(mediaWhiteReplacement: boolean, size: number) =>
                getImageServerUrl(media.id, size, mediaWhiteReplacement)
              } // cf. paddedSize
              openLightBox={(_) => (_) => {}}
              setSelection={(mediaId: string) => (e) => {
                e.stopPropagation()
              }}
              status={media.status}
              headerHeightRatio={mediaHeaderRatio}
              controlId={media.controlId}
              badges={mediaBadges}
              userBadge={userBadges[media.id]}
              setUserBadge={(x, y) => (z) => {}}
            />
          </Box>
        )
      })}
    </ReferenceBody>
  </ReferenceItemBox>
)

export default ReferenceCard
