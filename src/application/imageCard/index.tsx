import React, { useState } from "react"

import { Image } from "@chakra-ui/react"

import EnlargeSvg from "../../assets/images/enlarge.svg"
import { EnlargeBox, ImageBox, ImageBoxLoading, ImageErrorBox } from "./styles"
import { ImageCardProps } from "./types"

const ImageCard = ({
  urlSource,
  imageSize,
  transparency,
  checked,
  openLightBox,
  toggleCardSelection,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) return <ImageErrorBox boxSize={imageSize} />

  return (
    <ImageBox item-checked={`${checked}`} data-loaded={loaded} data-transparency={transparency}>
      <EnlargeBox className="enlargeImage" size={imageSize} onClick={openLightBox}>
        <Image src={EnlargeSvg} />
      </EnlargeBox>

      <Image
        boxSize={`${imageSize}`}
        objectFit="contain"
        src={urlSource}
        fallback={<ImageBoxLoading boxSize={imageSize} />}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        onClick={toggleCardSelection}
      />
    </ImageBox>
  )
}

export default ImageCard
