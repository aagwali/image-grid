import { prop } from "rambda"
import { useState } from "react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { Url } from "../../components/navigateSetter"
import { contextSlice } from "../../reducers"

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = contextSlice

  const { label } = getState(prop("context"))

  const [inputText, updateInputText] = useState(label)

  const navigateToContext = (input: string) => () => {
    dispatch(actions.resetContext(input))

    Url.navigate(`context/${input}`)
  }

  return { inputText, updateInputText, navigateToContext }
}
