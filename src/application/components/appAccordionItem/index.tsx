import React from "react"

import { AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react"

import { AccordionButtonLayout, AccordionTitle } from "./styles"

const AppAccordionItem = ({ title, children }: any) => (
  <AccordionItem borderWidth={0}>
    <AccordionButtonLayout>
      <AccordionIcon />
      <AccordionTitle flex="1" textAlign="left" children={title} />
    </AccordionButtonLayout>
    <AccordionPanel>{children}</AccordionPanel>
  </AccordionItem>
)

export default AppAccordionItem
