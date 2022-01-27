import React, { useState } from "react"

import { Center, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverTrigger, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../../assets/images/enlarge.svg"
import { ColorBadges, ControlStatus, UserStars } from "../../types"
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
  CardUserBadgesBox,
  Ellipsis,
  EnlargeBox,
  PaddingBox,
  PopoverContentColors,
  PopoverContentStars,
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
  userBadge,
  setColorBadge,
  setUserStars,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const paddedSize = Math.floor(imageSize * (1 - (5 / imageSize) * 2))
  const boundedSize = getBoundedSize(paddedSize, 160)
  const minTextSize = getBoundedSize(paddedSize, Math.floor(180 * (1 - (5 / 180) * 2)))

  const initRef = React.useRef()

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

            {/* <EnlargeBox2 size={getBoundedSize(imageSize, 160)} onClick={setColorBadge(ColorBadges.Red)}>
              <Image src={EnlargeSvg} />
            </EnlargeBox2> */}

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
          <CardUserBadgesBox spacing={0.5} data-header={headerHeightRatio !== 0} size={imageSize}>
            <Popover trigger="hover" placement="bottom-start" autoFocus={false}>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <CardBadge
                      size={boundedSize}
                      badge={userBadge?.color ?? ColorBadges.Grey}
                      onClick={(e: any) => {
                        setColorBadge(ColorBadges.Grey)(e)
                        onClose()
                      }}
                      style={{ cursor: "pointer" }}
                      ref={initRef}
                    ></CardBadge>
                  </PopoverTrigger>
                  <PopoverContentColors size={boundedSize}>
                    <PopoverArrow />
                    <PopoverBody>
                      <HStack style={{ cursor: "pointer" }}>
                        <CardBadge
                          size={boundedSize}
                          badge={ColorBadges.Red}
                          onClick={(e: any) => {
                            setColorBadge(ColorBadges.Red)(e)
                            onClose()
                          }}
                          ref={initRef}
                        ></CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={ColorBadges.Green}
                          onClick={(e: any) => {
                            setColorBadge(ColorBadges.Green)(e)
                            onClose()
                          }}
                          ref={initRef}
                        ></CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={ColorBadges.Blue}
                          onClick={(e: any) => {
                            setColorBadge(ColorBadges.Blue)(e)
                            onClose()
                          }}
                          ref={initRef}
                        ></CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={ColorBadges.Yellow}
                          onClick={(e: any) => {
                            setColorBadge(ColorBadges.Yellow)(e)
                            onClose()
                          }}
                          ref={initRef}
                        ></CardBadge>
                      </HStack>
                    </PopoverBody>
                  </PopoverContentColors>
                </>
              )}
            </Popover>

            <Popover trigger="hover" autoFocus={false}>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <CardBadge
                      size={boundedSize}
                      badge={userBadge?.stars ?? UserStars.None}
                      onClick={(e: any) => {
                        setUserStars(UserStars.None)(e)
                        onClose()
                      }}
                      style={{ cursor: "pointer" }}
                      ref={initRef}
                    >
                      {`${userBadge?.stars ?? ""}★`}
                    </CardBadge>
                  </PopoverTrigger>
                  <PopoverContentStars size={boundedSize}>
                    <PopoverArrow />
                    <PopoverBody>
                      <HStack style={{ cursor: "pointer" }}>
                        <CardBadge
                          size={boundedSize}
                          badge={UserStars.One}
                          onClick={(e: any) => {
                            setUserStars(UserStars.One)(e)
                            onClose()
                          }}
                          ref={initRef}
                        >
                          ★
                        </CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={UserStars.Two}
                          onClick={(e: any) => {
                            setUserStars(UserStars.Two)(e)
                            onClose()
                          }}
                          ref={initRef}
                        >
                          ★
                        </CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={UserStars.Three}
                          onClick={(e: any) => {
                            setUserStars(UserStars.Three)(e)
                            onClose()
                          }}
                          ref={initRef}
                        >
                          ★
                        </CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={UserStars.Four}
                          onClick={(e: any) => {
                            setUserStars(UserStars.Four)(e)
                            onClose()
                          }}
                          ref={initRef}
                        >
                          ★
                        </CardBadge>
                        <CardBadge
                          size={boundedSize}
                          badge={UserStars.Five}
                          onClick={(e: any) => {
                            setUserStars(UserStars.Five)(e)
                            onClose()
                          }}
                          ref={initRef}
                        >
                          ★
                        </CardBadge>
                      </HStack>
                    </PopoverBody>
                  </PopoverContentStars>
                </>
              )}
            </Popover>
          </CardUserBadgesBox>
        )}

        {badges && (
          <CardBadgesBox spacing={0.5}>
            <ToolTip tooltip={status}>
              <CardBadge size={getBoundedSize(imageSize, 160)} badge={status}>
                <Ellipsis size={boundedSize}>{getBadgeLabel(status)} </Ellipsis>
              </CardBadge>
            </ToolTip>

            {controlId ? (
              <ToolTip tooltip={ControlStatus.Validated}>
                <CardBadge size={getBoundedSize(imageSize, 160)} badge={ControlStatus.Validated}>
                  <Ellipsis size={boundedSize}>{getBadgeLabel(ControlStatus.Validated)}</Ellipsis>
                </CardBadge>
              </ToolTip>
            ) : (
              <ToolTip tooltip={ControlStatus.Pending}>
                <CardBadge size={getBoundedSize(imageSize, 160)} badge={ControlStatus.Pending}>
                  <Ellipsis size={boundedSize}> {getBadgeLabel(ControlStatus.Pending)} </Ellipsis>
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
