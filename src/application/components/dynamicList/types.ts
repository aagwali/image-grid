export interface DynamicListProps {
  items: any[]
  itemsLoaded: boolean
  renderItem: (item: any) => JSX.Element
  headerHeightRatio?: number
  contentSize: number
}
