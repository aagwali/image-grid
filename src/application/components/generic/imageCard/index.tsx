import React, { useState } from "react"
import styled from "styled-components"

import { Image } from "@chakra-ui/react"

import MaximizeSvg from "../../../assets/images/maximize.svg"
import { EnlargeBox, ImageBox, ImageBoxError, ImageBoxLoading } from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({ urlSource, imageSize, transparency, openLightBox }: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) return <ImageBoxError boxSize={imageSize} />

  return (
    <ImageBox data-loaded={loaded} data-transparency={transparency}>
      <EnlargeBox className="maximizeImage" onClick={openLightBox} size={imageSize}>
        <Image src={MaximizeSvg} />
      </EnlargeBox>

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
