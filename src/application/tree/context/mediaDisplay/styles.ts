import React from "react"
import styled, { css } from "styled-components"

import { AccordionButton, AccordionItem, Box, Button, HStack, Text, theme } from "@chakra-ui/react"

import DeselectAll from "../../../../assets/images/deselectAll.svg"
import Download from "../../../../assets/images/download.svg"
import MsLogoBack from "../../../../assets/images/msLogoBackground.svg"
import Restore from "../../../../assets/images/restore.svg"
import SelectAll from "../../../../assets/images/selectAll.svg"
import SpinnerSvg from "../../../../assets/images/spinner.svg"
import Trash from "../../../../assets/images/trashCan.svg"

//#region MEDIA

export const MediaBox = styled(Box)`
  width: 100%;
  background: #fafafa;
`

export const LogoBox = styled(Box)`
  border-width: 1px;
  border-color: ${theme.colors.gray[300]};
  background: url("${SpinnerSvg}") center no-repeat;

  ${({ loaded }) => {
    if (loaded === "true")
      return css`
        background: url("${MsLogoBack}") center no-repeat;
      `
  }};
`

//#endregion

//#region SIDE BAR COMMON

export const SideBarBox = styled(Box)`
  width: ${theme.space[72]};
`

export const SeparatorBox = styled(Box)`
  height: ${theme.space[4]};
  background: ${theme.colors.gray[50]};
  border-top-width: 0.75px;
  border-bottom-width: 0.75px;
`

export const AccordionButtonBox = styled(AccordionButton)`
  height: 40px;
  color: ${theme.colors.teal[800]};

  :focus {
    box-shadow: none;
  }
  :hover {
    background: none;
    color: ${theme.colors.teal[400]};
  }
`

export const AccordionButtonTitle = styled(Text)`
  font-size: 14px;
  font-weight: ${theme.fontWeights.semibold};
`
//#endregion

//#region LEFT BAR

export const DisplayAccordion = styled(AccordionItem)``

export const FiltersAccordion = styled(AccordionItem)``

export const FilterItem = styled(Box)`
  width: 160px;
  display: flex;
  justify-content: "space-between";
  align-items: "center";
`

export const LeftBarLabelTitle = styled(Box)`
  font-size: 13px;
  user-select: none;
  font-weight: ${theme.fontWeights.semibold};
`

export const LeftBarLabel = styled(Text)`
  font-size: 13px;
  :hover {
    color: ${theme.colors.teal[400]};
  }
`

export const DisabledCheck = styled(Box)`
  width: 12px;
  height: 12px;
  border-width: 2px;
  border-color: ${theme.colors.gray[200]};
  border-radius: 2px;
  background: ${theme.colors.gray[100]};
`

export const DisplayCheckboxGroup = styled(Box)``

//#endregion

//#region RIGHT BAR

export const RightBarActionBox = styled(HStack)`
  ${({ enabled }) => {
    if (enabled === "false")
      return css`
        opacity: 0.4;
        pointer-events: none;
      `
  }};
`

export const RightBarAction = styled(Box)`
  user-select: none;
  cursor: pointer;

  font-size: 13px;
  text-decoration: underline;
  color: ${theme.colors.teal[400]};
  :hover {
    background: none;
    color: ${theme.colors.teal[600]};
  }
`

export const RightBarButton = styled(Button)`
  border-radius: 3px;
  border-width: 2px;
  padding: 5px;

  :hover {
    background: none;
  }
  :focus {
    box-shadow: none;
  }
`

export const RedButton = styled(RightBarButton)`
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

export const TealButton = styled(RightBarButton)`
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

export const ActionIcon = styled(Box)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const SelectAllIcon = styled(ActionIcon)`
  background: url("${SelectAll}") center no-repeat;
`

export const DeselectAllIcon = styled(ActionIcon)`
  background: url("${DeselectAll}") center no-repeat;
`

export const TrashIcon = styled(ActionIcon)`
  background: url("${Trash}") center no-repeat;
`

export const RestoreIcon = styled(ActionIcon)`
  background: url("${Restore}") center no-repeat;
`

export const DownloadIcon = styled(ActionIcon)`
  padding-bottom: 2px;
  background: url("${Download}") center no-repeat;
`

//#endregion
