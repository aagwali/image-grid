export interface MediaGridProps {
  contentSize: number
}

export type UpdateDisplayCallBack = React.Dispatch<React.SetStateAction<[number, number]>>

export type Display = {
  contentSize: number
  transparency: boolean
  lightBoxItemId: "none" | string
}
