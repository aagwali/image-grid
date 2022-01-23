import React from "react"

export type RestoreProps = {
  selectedMediaIds: string[]
  restoreMedia: React.Dispatch<any>
  deselectAll: () => any
}
