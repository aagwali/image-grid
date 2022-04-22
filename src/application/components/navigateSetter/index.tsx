import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const Url = {
  navigateHook: {} as NavigateFunction,
  navigate: (page: any, ...rest: any) => Url.navigateHook(page, ...rest),
}

export const NavigateSetter = () => {
  Url.navigate = useNavigate()

  return <React.Fragment />
}
export default NavigateSetter
