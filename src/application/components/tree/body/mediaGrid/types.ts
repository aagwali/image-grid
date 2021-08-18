export interface MediaGridProps {
  contentSize: number
}

export type UpdateDisplayCallBack = React.Dispatch<React.SetStateAction<[number, number]>>

export type RawMedium = {
  id: string
  mediaUid: string
}

export enum MediaGridEndpoints {
  GetMediaByContextLabel = "getMediaByContextLabel",
}

export type Display = {
  contentSize: number
  transparency: boolean
  lightBoxMediaId: "none" | string
}
