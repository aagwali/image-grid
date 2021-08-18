export interface ImageCardProps {
  urlSource: string
  imageSize: number
  transparency?: boolean
  openLightBox: (mediumId: string) => void
}
