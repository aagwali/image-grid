import { MediaItem } from "../../../../../../types"

export type ControlFiltersProps = {
  controlIsIndeterminate: boolean
  search: string
  itemsByFilterData: Record<string, MediaItem[]>
  updateFilter: (newSearch: string) => void
}
