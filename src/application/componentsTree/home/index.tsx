import { prop, T } from "rambda"
import React, { useState } from "react"
import Hotkeys from "react-hot-keys"

import { Center, Input, InputGroup } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector as getState } from "../../../storeConfig"
import { Url } from "../../components/navigateSetter"
import { contextSlice } from "../../reducers"

const Home = (_: any) => {
  const dispatch = useAppDispatch()
  const { actions } = contextSlice

  const { label } = getState(prop("context"))

  const [inputText, updateInputText] = useState(label)

  const navigateToContext = (input: string) => () => {
    dispatch(actions.resetContext(input))

    Url.navigate(`context/${input}`)
  }
  return (
    <Center>
      <Hotkeys
        keyName="enter"
        filter={T} // get hotkey from input
        onKeyDown={navigateToContext(inputText)}
      />
      <Center>
        <InputGroup>
          <Input
            autoFocus={true}
            value={inputText}
            placeholder="Select an operation"
            onChange={(e) => updateInputText(e.target.value)}
          />
        </InputGroup>
      </Center>
    </Center>
  )
}

export default Home
