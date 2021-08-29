import React, { useState } from "react"
import styled from "styled-components"

import { Image, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../assets/images/enlarge.svg"
import AppToolTip from "../appTooltip"
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
  badgePadding = 0,
  controlId,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const paddedSize = Math.floor(imageSize * (1 - (badgePadding / imageSize) * 2))

  return (
    <PaddingBox onClick={selectionHandler} padding={badgePadding}>
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
        {badgePadding !== 0 && (
          <CardBadgesBox spacing={0.5}>
            <AppToolTip tooltip={status}>
              <CardBadge size={imageSize} badge={status}>
                <Ellipsis size={imageSize}>Size</Ellipsis>
              </CardBadge>
            </AppToolTip>

            {controlId && (
              <AppToolTip tooltip={controlId}>
                <CardBadge data-tip="React-tooltip" size={imageSize} badge={controlId}>
                  <Ellipsis size={imageSize}>Control</Ellipsis>
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
