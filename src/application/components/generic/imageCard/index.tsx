import React, { useState } from "react"

import { Image } from "@chakra-ui/react"

import { ImageBox, ImageBoxError, ImageBoxLoading } from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({ urlSource, imageSize, transparency }: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) return <ImageBoxError boxSize={imageSize} />

  return (
    <ImageBox data-loaded={loaded} data-transparency={transparency}>
      <Image
        boxSize={`${imageSize}`}
        objectFit="contain"
        src={urlSource}
        alt="ALT"
        fallback={<ImageBoxLoading boxSize={imageSize} />}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
    </ImageBox>
  )
}

export default ImageCard
