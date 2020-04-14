import React, { useEffect } from "react"
import { Route, withRouter } from "react-router-dom"
import { useAuth0 } from "utils/auth0"

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      })
    }
    fn()
  }, [loading, isAuthenticated, loginWithRedirect, path])

  const render = props => (isAuthenticated === true ? <Component {...props} /> : null)

  return <Route path={path} render={render} {...rest} />
}

export default withRouter(PrivateRoute)