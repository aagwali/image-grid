import { QualityStatus } from "../types"

export interface ImageCardProps {
  title: string
  subtitle: string
  imageSize: number
  transparency: boolean
  openLightBox: (e: MouseEvent) => void
  selectionHandler: (e: any) => void
  checked: boolean
  getUrlBySize: (size: number) => string
  status: QualityStatus
  headerHeightRatio?: number
  controlId?: string
  badges: boolean
}
