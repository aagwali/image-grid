export interface ImageCardProps {
  urlSource: string
  imageSize: number
  transparency: boolean
  openLightBox: () => void
  toggleCardSelection: (e: any) => void
  checked: boolean
}
