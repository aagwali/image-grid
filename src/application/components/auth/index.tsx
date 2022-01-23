import React from "react"

// TODO FIX SSO is not working anymore : " Content Security Policy directive: frame-ancestors 'self' "
const Authentication = ({ children }: any) => {
  // const [authenticated, setAuthenticated] = useState(false)
  // triggerAuth(setAuthenticated)
  // return !authenticated ? <React.Fragment /> : children
  return children
}

export default Authentication
