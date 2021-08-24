import { prop } from "rambda"
import React from "react"

import { useAppSelector } from "../../../../../storeConfig"
import { handleFailedQueries } from "./privates"

const Error = () => {
  const errorAction = useAppSelector(prop("errorAction"))
  handleFailedQueries(errorAction)
  return <React.Fragment />
}

export default Error
