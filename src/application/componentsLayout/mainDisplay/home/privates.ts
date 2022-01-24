import { prop } from "rambda"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector as getState } from "../../../../storeConfig"
import { contextSlice } from "../context/reducers"

export const getContainerProps = () => {
  const dispatch = useAppDispatch()
  const { actions } = contextSlice

  const { label } = getState(prop("context"))

  const [inputText, updateInputText] = useState(label)

  const navigate = useNavigate()

  const navigateToContext = (input: string) => () => {
    dispatch(actions.resetContext(input))

    navigate(`../context/${input}`)
  }

  return { inputText, updateInputText, navigateToContext }
}
