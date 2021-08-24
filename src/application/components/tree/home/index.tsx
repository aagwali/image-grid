import React, { useState } from "react"

import { Button, Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { navigate, RouteComponentProps } from "@reach/router"

import { useAppDispatch } from "../../../../storeConfig"
import { mediaSlice } from "../../../reducers"
import { HomeInputBox } from "./styles"

const Home = (_: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { actions } = mediaSlice

  const [inputText, updateInputText] = useState("")

  const resetMedia = () => dispatch(actions.removeAllMedia()) // TODO add loaded to false ?

  return (
    <Center>
      <HomeInputBox>
        <InputGroup>
          <Input placeholder="Select an operation" onChange={(e) => updateInputText(e.target.value)} />
          <InputRightElement width="5rem">
            <Button
              colorScheme="teal"
              onClick={() => {
                resetMedia()
                navigate(inputText)
              }}
            >
              Validate
            </Button>
          </InputRightElement>
        </InputGroup>
      </HomeInputBox>
    </Center>
  )
}

export default Home
