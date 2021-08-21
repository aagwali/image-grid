import React, { useState } from "react"

import { Image } from "@chakra-ui/react"

import EnlargeSvg from "../../../assets/images/enlarge.svg"
import { EnlargeBox, ImageBox, ImageBoxError, ImageBoxLoading } from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({ urlSource, imageSize, transparency, openLightBox }: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) return <ImageBoxError boxSize={imageSize} />

  return (
    <ImageBox data-loaded={loaded} data-transparency={transparency}>
      <EnlargeBox className="enlargeImage" onClick={openLightBox} size={imageSize}>
        <Image src={EnlargeSvg} />
      </EnlargeBox>

      <Image
        boxSize={`${imageSize}`}
        objectFit="contain"
        src={urlSource}
        fallback={<ImageBoxLoading boxSize={imageSize} />}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
    </ImageBox>
  )
}

export default ImageCard
