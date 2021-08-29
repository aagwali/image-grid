export interface ImageCardProps {
  title: string
  subtitle: string
  padding?: number
  imageSize: number
  transparency: boolean
  openLightBox: (e: MouseEvent) => void
  toggleCardSelection: (e: any) => void
  checked: boolean
  headerHeightRatio?: number
  getUrlBySize: (size: number) => string
}
