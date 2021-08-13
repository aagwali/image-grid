import { prop } from "rambda"
import React from "react"

import { useAppSelector } from "../../../../storeConfig"
import { handleFailedQueries } from "./privates"

const getStateProps = () => ({
  errorAction: useAppSelector(prop("errorAction")),
})

const Error = () => {
  const { errorAction } = getStateProps()
  handleFailedQueries(errorAction)
  return <React.Fragment />
}

export default Error
