import React from "react"

import { Link } from "@chakra-ui/react"
import { Link as RouterLink } from "@reach/router"

import { ArticleIcon, AssociateIcon, HomeIcon, MediaIcon, MsLogoIcon, NavBarBox, TrashIcon } from "./styles"

const NavigationBar = ({ home }: any) => {
  return (
    <NavBarBox spacing={3}>
      <Link as={RouterLink} to="/">
        <MsLogoIcon />
      </Link>
      <Link as={RouterLink} to="/">
        <HomeIcon />
      </Link>
      {!home && (
        <React.Fragment>
          <Link as={RouterLink} to="medias">
            <ArticleIcon />
          </Link>
          <Link as={RouterLink} to="medias">
            <MediaIcon />
          </Link>
          <Link as={RouterLink} to="medias">
            <AssociateIcon />
          </Link>
          <Link as={RouterLink} to="medias">
            <TrashIcon />
          </Link>
        </React.Fragment>
      )}
    </NavBarBox>
  )
}

export default NavigationBar
