import { MediumItem } from "../../../../../../types"

export type QualityFilterProps = {
  allCheckedQualityFilters: boolean
  isIndeterminateQualityFilters: boolean
  updateFilter: React.Dispatch<any>
  search: string
  itemsByFilterData: Record<string, MediumItem[]>
}
