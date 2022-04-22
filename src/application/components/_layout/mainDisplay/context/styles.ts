import styled from "styled-components"

import { Box, Button, PopoverContent, Text, theme } from "@chakra-ui/react"

export const SideBar = styled(Box)`
  min-width: ${theme.space[56]};
`

export const Separator = styled(Box)`
  height: ${theme.space[4]};
  background: ${theme.colors.gray[50]};
  border-top-width: 0.75px;
  border-bottom-width: 0.75px;
`

export const AppButton = styled(Button)`
  border-radius: 3px;
  border-width: 2px;
  padding: 5px;
  background: ${theme.colors.white};

  :hover {
    background: ${theme.colors.white};
  }
  :focus {
    box-shadow: none;
  }
`

export const RedButton = styled(AppButton)`
  color: ${theme.colors.red[500]};
  border-color: ${theme.colors.red[500]};

  :hover {
    box-shadow: 0.6px 0.6px 4px ${theme.colors.red[300]};
  }
  :active {
    background: ${theme.colors.red[50]};
    box-shadow: none;
  }
`

export const TealButton = styled(AppButton)`
  color: ${theme.colors.teal[500]};
  border-color: ${theme.colors.teal[500]};

  :hover {
    box-shadow: 0.6px 0.6px 4px ${theme.colors.teal[500]};
  }
  :active {
    background: ${theme.colors.teal[50]};
    box-shadow: none;
  }
`

export const PopOverTitle = styled(Text)`
  font-size: 14px;
  font-weight: ${theme.fontWeights.semibold};
`

export const PopOverSubTitle = styled(Text)`
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.teal[600]};
  user-select: none;
`

export const PopOverConfirm = styled(PopoverContent)`
  border-width: 1px;
  border-color: ${theme.colors.gray[300]};
  border-radius: 2px;
  margin-right: ${theme.space[5]};
  :active {
    box-shadow: none;
  }
  :focus {
    box-shadow: none;
  }
`
