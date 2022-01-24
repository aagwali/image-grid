import React from "react"

import { AccordionIcon, AccordionItem as ChackraAccordionItem, AccordionPanel } from "@chakra-ui/react"

import { AccordionButtonLayout, AccordionTitle } from "./styles"

const AccordionItem = ({ title, children }: any) => (
  <ChackraAccordionItem borderWidth={0}>
    <AccordionButtonLayout>
      <AccordionIcon />
      <AccordionTitle flex="1" textAlign="left" children={title} />
    </AccordionButtonLayout>
    <AccordionPanel>{children}</AccordionPanel>
  </ChackraAccordionItem>
)

export default AccordionItem
