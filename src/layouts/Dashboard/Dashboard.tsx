import React, { Suspense, useState } from 'react';
// import { Layout } from "react-admin"
import { renderRoutes } from 'react-router-config';

import { LinearProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import NavBar from './NavBar';
import TopBar from './TopBar';

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
  //   return <Layout {...props} appBar={TopBar} />
  const classes = useStyles()
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false)
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
