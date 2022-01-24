import { MediumItem } from "../../../../../../types"

export type ControlFiltersProps = {
  controlIsIndeterminate: boolean
  search: string
  itemsByFilterData: Record<string, MediumItem[]>
  updateFilter: (newSearch: string) => void
}
