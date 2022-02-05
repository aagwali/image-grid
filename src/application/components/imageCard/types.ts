import { ColorBadges, QualityStatus, UserBadgesProps, UserStars } from "../../types"

export interface ImageCardProps {
  mediaId: string
  title: string
  subtitle: string
  imageSize: number
  transparency: boolean
  checked: boolean
  status: QualityStatus
  headerHeightRatio?: number
  whiteReplacement: boolean
  controlId?: string
  badges: boolean
  userBadge: UserBadgesProps
  getUrlBySize: (whiteReplacement: boolean, size: number) => string
  openLightBox: (mediaId: string) => (mouseEvent: MouseEvent) => void
  setSelection: (mediaId: string) => (mouseEvent: MouseEvent) => void
  setUserBadge: (
    mediaId: string,
    badgeType: "stars" | "color",
    value: ColorBadges | UserStars,
  ) => (mouseEvent: MouseEvent) => void
}
