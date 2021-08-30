import { T } from "rambda"
import React, { useState } from "react"
import Hotkeys from "react-hot-keys"

import { Button, Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { navigate, RouteComponentProps } from "@reach/router"

import { useAppDispatch } from "../../../storeConfig"
import { contextSlice } from "../../reducers"
import NavigationBar from "../navBar"
import { NavigationBarBox, NavigationLeftBox, NavigationRightBox } from "../navBar/styles"
import { HomeInputBox } from "./styles"

const Home = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = contextSlice

  const [inputText, updateInputText] = useState("")

  const initiateContext = (input: string) => () => {
    dispatch(actions.initiateContext(input))
    navigate(`context/${inputText}`)
  }

  return (
    <NavigationBarBox>
      <Hotkeys
        keyName="enter"
        filter={T} // get hotkey from input
        onKeyDown={initiateContext(inputText)}
      />
      <NavigationLeftBox>
        <NavigationBar />
      </NavigationLeftBox>
      <NavigationRightBox style={{ flex: 38 }}>
        <Center>
          <HomeInputBox>
            <InputGroup>
              <Input
                autoFocus={true}
                placeholder="Select an operation"
                onChange={(e) => updateInputText(e.target.value)}
              />
              <InputRightElement width="5rem">
                <Button colorScheme="teal" onClick={initiateContext(inputText)}>
                  Validate
                </Button>
              </InputRightElement>
            </InputGroup>
          </HomeInputBox>
        </Center>
      </NavigationRightBox>
    </NavigationBarBox>
  )
}

export default Home
