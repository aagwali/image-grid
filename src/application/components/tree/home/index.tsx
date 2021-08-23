import React, { useState } from "react"

import { Button, Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { navigate, RouteComponentProps } from "@reach/router"

import { HomeInputBox } from "./styles"

const Home = (_: RouteComponentProps) => {
  const [inputText, updateInputText] = useState("")
  return (
    <Center>
      <HomeInputBox>
        <InputGroup>
          <Input placeholder="Select an operation" onChange={(e) => updateInputText(e.target.value)} />
          <InputRightElement width="5rem">
            <Button colorScheme="teal" onClick={() => navigate(inputText)}>
              Validate
            </Button>
          </InputRightElement>
        </InputGroup>
      </HomeInputBox>
    </Center>
  )
}

export default Home
