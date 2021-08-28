import React, { useState } from "react"

import { Image, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../assets/images/enlarge.svg"
import {
  CardBox,
  CardHeaderBox,
  CardImageBox,
  CardImageErrorBox,
  CardImageLoading,
  CardSubTitle,
  CardTitle,
  EnlargeBox,
} from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({
  title,
  subtitle,
  urlSource,
  imageSize,
  transparency,
  checked,
  openLightBox,
  toggleCardSelection,
  headerHeightRatio = 0,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <CardBox
      item-checked={`${checked}`}
      data-loaded={loaded}
      data-transparency={transparency}
      onClick={toggleCardSelection}
    >
      <CardHeaderBox height={imageSize * headerHeightRatio}>
        <VStack spacing={0}>
          <CardTitle children={title} size={imageSize} />
          <CardSubTitle children={subtitle} size={imageSize} />
        </VStack>
      </CardHeaderBox>

      {error ? (
        <CardImageErrorBox boxSize={imageSize} />
      ) : (
        <CardImageBox>
          <EnlargeBox className="enlargeImage" size={imageSize} onClick={openLightBox}>
            <Image src={EnlargeSvg} />
          </EnlargeBox>

          <Image
            boxSize={`${imageSize}`}
            objectFit="contain"
            src={urlSource}
            fallback={<CardImageLoading boxSize={imageSize} />}
            onError={() => setError(true)}
            onLoad={() => setLoaded(true)}
          />
        </CardImageBox>
      )}
    </CardBox>
  )
}

export default ImageCard
