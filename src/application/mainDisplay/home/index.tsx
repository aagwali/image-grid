import { T } from "rambda"
import React from "react"
import Hotkeys from "react-hot-keys"

import { Center, Input, InputGroup } from "@chakra-ui/react"

import { getContainerProps } from "./privates"

const Home = () => {
  const { inputText, updateInputText, navigateToContext } = getContainerProps()

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
