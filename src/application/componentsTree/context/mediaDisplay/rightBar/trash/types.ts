import React from "react"

export type TrashProps = {
  selectedMediaIds: string[]
  pendingIdsInSelection: string[]
  trashMedia: React.Dispatch<any>
  deselectAll: () => any
}
