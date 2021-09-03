import React, { useState } from "react"

import { Image, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../assets/images/enlarge.svg"
import AppToolTip from "../appTooltip"
import { ControlStatus } from "../types"
import { getControlLabel, getQualityLabel } from "./privates"
import {
  CardBadge,
  CardBadgesBox,
  CardBox,
  CardHeaderBox,
  CardImageBox,
  CardImageErrorBox,
  CardImageLoading,
  CardSubTitle,
  CardTitle,
  Ellipsis,
  EnlargeBox,
  PaddingBox,
} from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({
  title,
  subtitle,
  imageSize,
  transparency,
  checked,
  openLightBox,
  selectionHandler,
  getUrlBySize,
  status,
  headerHeightRatio = 0,
  controlId,
  badges,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const paddedSize = Math.floor(imageSize * (1 - (5 / imageSize) * 2))

  return (
    <PaddingBox onClick={selectionHandler} padding={5}>
      <CardBox checked={checked} data-loaded={loaded} data-transparency={transparency}>
        {headerHeightRatio !== 0 && (
          <CardHeaderBox height={paddedSize * headerHeightRatio}>
            <VStack spacing={0}>
              <CardTitle children={title} size={paddedSize} />
              <CardSubTitle children={subtitle} size={paddedSize} />
            </VStack>
          </CardHeaderBox>
        )}

        {error ? (
          <CardImageErrorBox boxSize={paddedSize} />
        ) : (
          <CardImageBox>
            <EnlargeBox className="enlargeImage" size={paddedSize} onClick={openLightBox}>
              <Image src={EnlargeSvg} />
            </EnlargeBox>

            <Image
              boxSize={`${paddedSize}`}
              objectFit="contain"
              src={getUrlBySize(paddedSize)}
              fallback={<CardImageLoading boxSize={paddedSize} />}
              onError={() => setError(true)}
              onLoad={() => setLoaded(true)}
            />
          </CardImageBox>
        )}
        {badges && (
          <CardBadgesBox spacing={0.5}>
            <AppToolTip tooltip={status}>
              <CardBadge size={imageSize} badge={status}>
                <Ellipsis size={imageSize}>{getQualityLabel(status)} </Ellipsis>
              </CardBadge>
            </AppToolTip>

            {controlId ? (
              <AppToolTip tooltip={ControlStatus.Validated}>
                <CardBadge size={imageSize} badge={ControlStatus.Validated}>
                  <Ellipsis size={imageSize}>{getControlLabel(ControlStatus.Validated)}</Ellipsis>
                </CardBadge>
              </AppToolTip>
            ) : (
              <AppToolTip tooltip={ControlStatus.Pending}>
                <CardBadge size={imageSize} badge={ControlStatus.Pending}>
                  <Ellipsis size={imageSize}> {getControlLabel(ControlStatus.Pending)} </Ellipsis>
                </CardBadge>
              </AppToolTip>
            )}
          </CardBadgesBox>
        )}
      </CardBox>
    </PaddingBox>
  )
}

export default ImageCard
