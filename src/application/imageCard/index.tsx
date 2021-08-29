import React, { useState } from "react"

import { Image, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../assets/images/enlarge.svg"
import {
  CardBadge,
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
  toggleCardSelection,
  getUrlBySize,
  headerHeightRatio = 0,
  padding = 0,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const paddedSize = Math.floor(imageSize * (1 - (padding / imageSize) * 2))

  return (
    <PaddingBox onClick={toggleCardSelection} padding={padding}>
      <CardBox checked={checked} data-loaded={loaded} data-transparency={transparency}>
        <CardHeaderBox height={paddedSize * headerHeightRatio}>
          <VStack spacing={0}>
            <CardTitle children={title} size={paddedSize} />
            <CardSubTitle children={subtitle} size={paddedSize} />
          </VStack>
        </CardHeaderBox>

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

        <CardBadge status={"statusTest"} size={imageSize}>
          <Ellipsis size={imageSize}>Size</Ellipsis>
        </CardBadge>
      </CardBox>
    </PaddingBox>
  )
}

export default ImageCard
