import { MediaItem } from "../../../../../../types"

export type ColorBadgeFilterProps = {
  allCheckedColorFilters: boolean
  isIndeterminateColor: boolean
  updateFilter: React.Dispatch<any>
  search: string
  itemsByFilterData: Record<string, MediaItem[]>
}
