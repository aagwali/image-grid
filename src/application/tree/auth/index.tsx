import React from "react"

import { useAppDispatch } from "../../../storeConfig"
import { triggerAuth } from "./privates"

const Auth = () => {
  const dispatch = useAppDispatch()

  triggerAuth(dispatch)
  return <React.Fragment></React.Fragment>
}

export default Auth
