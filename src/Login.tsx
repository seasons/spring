import React from "react"
import { Button } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { useLocation } from "react-router"
import { useHistory } from "react-router-dom"
import { useAuth0 } from "utils/auth0"

const LoginButton = styled(Button)({
  background: "white",
  border: "1px solid black",
  borderRadius: 3,
  color: "black",
  height: 48,
  padding: "0 30px",
})

export const Login = () => {
  let history = useHistory()
  let location = useLocation()
  const { loginWithRedirect } = useAuth0()

  let { from } = location.state || { from: { pathname: "/" } }
  let login = () => {
    loginWithRedirect(() => {
      history.replace(from)
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <LoginButton onClick={login}>Log In</LoginButton>
    </div>
  )
}
