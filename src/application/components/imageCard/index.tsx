import React, { useState } from "react"

import { Center, Image, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../../assets/images/enlarge.svg"
import { ControlStatus } from "../../types"
import ToolTip from "../tooltip"
import { getBadgeLabel, getBoundedSize } from "./privates"
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
  const minTextSize = getBoundedSize(paddedSize, Math.floor(180 * (1 - (5 / 180) * 2)))

  return (
    <PaddingBox onClick={selectionHandler} padding={5}>
      <CardBox checked={checked} data-loaded={loaded} data-transparency={transparency}>
        {headerHeightRatio !== 0 && (
          <ToolTip tooltip={title}>
            <CardHeaderBox height={paddedSize * headerHeightRatio}>
              <VStack spacing={0}>
                <Center w={paddedSize}>
                  <CardTitle children={title} size={paddedSize} text-size={minTextSize} />
                </Center>
                <Center w={paddedSize}>
                  <CardSubTitle children={subtitle} size={paddedSize} text-size={minTextSize} />
                </Center>
              </VStack>
            </CardHeaderBox>
          </ToolTip>
        )}

        {error ? (
          <CardImageErrorBox boxSize={paddedSize} />
        ) : (
          <CardImageBox>
            <EnlargeBox className="enlargeImage" size={getBoundedSize(imageSize, 160)} onClick={openLightBox}>
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
            <ToolTip tooltip={status}>
              <CardBadge size={getBoundedSize(imageSize, 160)} badge={status}>
                <Ellipsis size={getBoundedSize(imageSize, 160)}>{getBadgeLabel(status)} </Ellipsis>
              </CardBadge>
            </ToolTip>

            {controlId ? (
              <ToolTip tooltip={ControlStatus.Validated}>
                <CardBadge size={getBoundedSize(imageSize, 160)} badge={ControlStatus.Validated}>
                  <Ellipsis size={getBoundedSize(imageSize, 160)}>{getBadgeLabel(ControlStatus.Validated)}</Ellipsis>
                </CardBadge>
              </ToolTip>
            ) : (
              <ToolTip tooltip={ControlStatus.Pending}>
                <CardBadge size={getBoundedSize(imageSize, 160)} badge={ControlStatus.Pending}>
                  <Ellipsis size={getBoundedSize(imageSize, 160)}> {getBadgeLabel(ControlStatus.Pending)} </Ellipsis>
                </CardBadge>
              </ToolTip>
            )}
          </CardBadgesBox>
        )}
      </CardBox>
    </PaddingBox>
  )
}

export default ImageCard
