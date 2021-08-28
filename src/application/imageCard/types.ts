export interface ImageCardProps {
  title: string
  subtitle: string
  urlSource: string
  imageSize: number
  transparency: boolean
  openLightBox: (e: MouseEvent) => void
  toggleCardSelection: (e: any) => void
  checked: boolean
  headerHeightRatio?: number
}
