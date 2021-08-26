import Keycloak from "keycloak-js"

import { AppDispatch } from "../../../storeConfig"
import { authSlice } from "../../reducers"

const keycloak = Keycloak({
  realm: process.env.SSO_REALM ?? "",
  url: process.env.SSO_AUTH_URL,
  clientId: process.env.SSO_CLIENT_ID ?? "",
})

export const triggerAuth = async (dispatch: AppDispatch): Promise<void> => {
  const authenticated = await keycloak.init({ onLoad: "login-required" })

  if (!authenticated) {
    keycloak.login()
  } else {
    dispatch(authSlice.actions.setAuthenticated(true))

    if (keycloak.token) sessionStorage.setItem("kctoken", keycloak.token)

    setInterval(() => {
      keycloak.updateToken(10).catch(() => {
        keycloak.logout()
        dispatch(authSlice.actions.setAuthenticated(false))
      })
      if (keycloak.token) sessionStorage.setItem("kctoken", keycloak.token)
    }, 10000)
  }
}
