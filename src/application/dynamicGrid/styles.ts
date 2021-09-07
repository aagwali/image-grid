import styled from "styled-components"

import { Box, SliderTrack, Text, theme } from "@chakra-ui/react"

export const SliderBox = styled(Box)`
  padding-left: ${theme.space[1]};
  padding-right: ${theme.space[1]};
`
export const SliderTrackCustom = styled(SliderTrack)`
  height: ${theme.space[1]};
`
export const TextPlaceholder = styled(Text)`
  color: ${theme.colors.gray[400]};
  margin-top: ${theme.space[20]};
  font-weight: ${theme.fontWeights.bold};
`
