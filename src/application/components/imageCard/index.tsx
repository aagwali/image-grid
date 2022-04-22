import React, { useState } from "react"

import { Center, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverTrigger, VStack } from "@chakra-ui/react"

import EnlargeSvg from "../../../assets/images/enlarge.svg"
import { ColorBadges, ControlStatus, UserStars } from "../../types"
import ProgressiveRender from "../progressiveRender"
import ToolTip from "../tooltip"
import { getBadgeLabel, getBoundedSize } from "./privates"
import {
  BadgesBox,
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

const Badges = ({
  mediaId,
  headerHeightRatio,
  imageSize,
  boundedSize,
  userBadge,
  setUserBadge,
  initRef,
  status,
  controlId,
}: any) => (
  <BadgesBox>
    <CardUserBadgesBox spacing={0.5} data-header={headerHeightRatio !== 0} size={imageSize}>
      <Popover trigger="hover" placement="bottom-start" autoFocus={false}>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <CardBadge
                size={boundedSize}
                badge={userBadge?.color ?? ColorBadges.Grey}
                onClick={(mouseEvent: MouseEvent) => {
                  setUserBadge(mediaId, "color", ColorBadges.Grey)(mouseEvent)
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
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "color", ColorBadges.Red)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  ></CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={ColorBadges.Green}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "color", ColorBadges.Green)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  ></CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={ColorBadges.Blue}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "color", ColorBadges.Blue)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  ></CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={ColorBadges.Yellow}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "color", ColorBadges.Yellow)(mouseEvent)
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
                onClick={(mouseEvent: MouseEvent) => {
                  setUserBadge(mediaId, "stars", UserStars.None)(mouseEvent)
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
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "stars", UserStars.One)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  >
                    ★
                  </CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={UserStars.Two}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "stars", UserStars.Two)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  >
                    ★
                  </CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={UserStars.Three}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "stars", UserStars.Three)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  >
                    ★
                  </CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={UserStars.Four}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "stars", UserStars.Four)(mouseEvent)
                      onClose()
                    }}
                    ref={initRef}
                  >
                    ★
                  </CardBadge>
                  <CardBadge
                    size={boundedSize}
                    badge={UserStars.Five}
                    onClick={(mouseEvent: MouseEvent) => {
                      setUserBadge(mediaId, "stars", UserStars.Five)(mouseEvent)
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
  </BadgesBox>
)

const ImageCard = ({
  mediaId,
  title,
  subtitle,
  imageSize,
  transparency,
  checked,
  status,
  headerHeightRatio = 0,
  controlId,
  badges,
  userBadge,
  whiteReplacement,
  getUrlBySize,
  openLightBox,
  setUserBadge,
  setSelection,
}: ImageCardProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const paddedSize = Math.floor(imageSize * (1 - (5 / imageSize) * 2))
  const boundedSize = getBoundedSize(paddedSize, 160)
  const minTextSize = getBoundedSize(paddedSize, Math.floor(180 * (1 - (5 / 180) * 2)))

  const initRef = React.useRef()

  return (
    <PaddingBox onClick={setSelection(mediaId)} padding={5}>
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
            <EnlargeBox
              className="enlargeImage"
              size={getBoundedSize(imageSize, 160)}
              onClick={openLightBox(mediaId)}
              children={<Image src={EnlargeSvg} />}
            />

            <Image
              boxSize={`${paddedSize}`}
              objectFit="contain"
              src={getUrlBySize(whiteReplacement, paddedSize)}
              fallback={<CardImageLoading boxSize={paddedSize} />}
              onError={() => setError(true)}
              onLoad={() => setLoaded(true)}
            />
          </CardImageBox>
        )}

        {badges && (
          <ProgressiveRender>
            <Badges
              mediaId={mediaId}
              headerHeightRatio={headerHeightRatio}
              imageSize={imageSize}
              boundedSize={boundedSize}
              userBadge={userBadge}
              setUserBadge={setUserBadge}
              initRef={initRef}
              status={status}
              controlId={controlId}
            />
          </ProgressiveRender>
        )}
      </CardBox>
    </PaddingBox>
  )
}

function is(x: any, y: any) {
  if (typeof x === "function") {
    return x.toString() === y.toString()
  }

  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  )
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export default React.memo(ImageCard, function (objA: any, objB: any) {
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      console.log("not equal =====> ", keysA[i])
      return false
    }
  }

  return true
})
