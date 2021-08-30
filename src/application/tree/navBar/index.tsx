import React from "react"

import { Link } from "@chakra-ui/react"
import { Link as RouterLink } from "@reach/router"

import { ArticleIcon, HomeIcon, MediaLogoIcon, NavBarBox } from "./styles"

const NavigationBar = ({ home }: any) => {
  return (
    <NavBarBox spacing={1}>
      <Link as={RouterLink} to="/">
        <MediaLogoIcon />
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
            <ArticleIcon />
          </Link>
          <Link as={RouterLink} to="medias">
            <ArticleIcon />
          </Link>
        </React.Fragment>
      )}
    </NavBarBox>
  )
}

export default NavigationBar
