import React, { Suspense, useState, useEffect } from "react"
import { renderRoutes } from "react-router-config"
import { makeStyles } from "@material-ui/styles"
import { LinearProgress, Theme } from "@material-ui/core"
import NavBar from "./NavBar"
import TopBar from "./TopBar"
import { useAuth0 } from "utils/auth0"

const useStyles = makeStyles<Theme>(theme => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    "@media all and (-ms-high-contrast:none)": {
      height: 0, // IE11 fix
    },
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: "100%",
    overflowX: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: 56,
    },
  },
}))

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({ route }: any) => {
  const classes = useStyles()
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false)
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: "http://localhost:3000" },
      })
    }
    // fn()
  }, [loading, isAuthenticated, loginWithRedirect])

  return (
    <>
      <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
      <NavBar onMobileClose={() => setOpenNavBarMobile(false)} openMobile={openNavBarMobile} />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
        </div>
      </div>
    </>
  )
}
