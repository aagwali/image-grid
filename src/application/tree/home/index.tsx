import { T } from "rambda"
import React, { useState } from "react"
import Hotkeys from "react-hot-keys"

import { Center, Input, InputGroup } from "@chakra-ui/react"
import { navigate, RouteComponentProps } from "@reach/router"

import { useAppDispatch } from "../../../storeConfig"
import { contextSlice } from "../../reducers"

const Home = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = contextSlice

  const [inputText, updateInputText] = useState("")

  const initiateContext = (input: string) => () => {
    dispatch(actions.initiateContext({ id: "", label: input }))
    navigate(`context/${input}`)
  }

  return (
    <Center>
      <Hotkeys
        keyName="enter"
        filter={T} // get hotkey from input
        onKeyDown={initiateContext(inputText)}
      />
      <Center>
        <InputGroup>
          <Input autoFocus={true} placeholder="Select an operation" onChange={(e) => updateInputText(e.target.value)} />
        </InputGroup>
      </Center>
    </Center>
  )
}

export default Home
