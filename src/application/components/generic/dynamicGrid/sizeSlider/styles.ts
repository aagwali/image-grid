import styled from "styled-components"

import { Box, SliderTrack, theme } from "@chakra-ui/react"

export const SliderBox = styled(Box)`
  width: ${theme.space[52]};
  margin-right: ${theme.space[4]};
  margin-bottom: -${theme.space[1]};
`
export const SliderTrackCustom = styled(SliderTrack)`
  height: ${theme.space[0.5]};
`
