export type TextFilterProps = {
  inputSearch: string
  search: string
  setInputSearch: React.Dispatch<any>
  updateFilter: (newSearch: string) => void
}
