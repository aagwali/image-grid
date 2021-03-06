import debounce from "debounce"
import React from "react"

import { HStack, InputGroup } from "@chakra-ui/react"

import { setTextFilter, toggleOffTextFilters } from "../privates"
import { CloseIcon, SearchInput } from "./styles"
import { TextFilterProps } from "./types"

export const TextFilter = ({ inputSearch, search, setInputSearch, updateFilter }: TextFilterProps) => (
  <HStack spacing={0} style={{ position: "relative" }}>
    <InputGroup>
      <SearchInput
        autoFocus={true}
        size={"xs"}
        placeholder="Filter on media name"
        value={inputSearch}
        onChange={(e: any) => {
          setInputSearch(e.target.value)
          updateFilter(setTextFilter(e.target.value, search))
        }}
      />
    </InputGroup>
    <CloseIcon
      onClick={() => {
        updateFilter(toggleOffTextFilters(search))
        setInputSearch("")
      }}
    />
  </HStack>
)
