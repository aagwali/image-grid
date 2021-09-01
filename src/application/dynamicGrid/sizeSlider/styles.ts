import styled from "styled-components"

import { Box, SliderTrack, theme } from "@chakra-ui/react"

export const SliderBox = styled(Box)`
  margin-left: ${theme.space[4]};
  margin-right: ${theme.space[4]};
`
export const SliderTrackCustom = styled(SliderTrack)`
  height: ${theme.space[1]};
`
