import React from "react"

import { AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react"

import { AccordionButtonBox, SideBarTitle } from "../../componentsTree/context/mediaDisplay/styles"

const PanelItem = ({ title, children }: any) => (
  <AccordionItem borderWidth={0}>
    <AccordionButtonBox>
      <AccordionIcon />
      <SideBarTitle flex="1" textAlign="left" children={title} />
    </AccordionButtonBox>
    <AccordionPanel>{children}</AccordionPanel>
  </AccordionItem>
)

export default PanelItem
