import { logout as logoutAction } from "actions/sessionActions"
import { NavItem, Logo } from "components"

import React, { useEffect } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, matchPath } from "react-router"
import styled from "styled-components"
import { colors } from "theme"

import { Box, Drawer, List, Theme, Typography, Hidden, Divider, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import "react-perfect-scrollbar/dist/css/styles.css"
import navConfig from "./navConfig"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: colors.black100,
    textColor: colors.white100,
  },
  mobileDrawer: {
    width: 256,
    height: "100%",
    border: "none",
    overflow: "hidden",
  },
  desktopDrawer: {
    width: 256,
    height: "100%",
    border: "none",
    overflow: "hidden",
  },
  navigation: {
    overflow: "auto",
    padding: theme.spacing(2, 0, 2, 0),
    flexGrow: 1,
  },
  divider: {
    backgroundColor: colors.black85,
  },
}))

const UserInfo = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: ${colors.white90};
`

const UserLogOut = styled(Button)`
  margin-top: 10px;
  cursor: pointer;
  color: ${colors.white90};
  &:hover {
    color: ${colors.black50};
  }
`

function renderNavItems({ items, ...rest }) {
  return (
    <>
      <List disablePadding>{items.reduce((acc, item) => reduceChildRoutes({ acc, item, ...rest } as any), [])}</List>
    </>
  )
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = Math.floor(Math.random() * Math.floor(10000))

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    })

    acc.push(
      <NavItem key={key} depth={depth} icon={item.icon} info={item.info} open={Boolean(open)} title={item.title}>
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    )
  } else {
    acc.push(<NavItem key={key} depth={depth} href={item.href} icon={item.icon} info={item.info} title={item.title} />)
  }

  return acc
}

export const NavBar: React.FC<any> = ({ openMobile, onMobileClose, ...rest }: any) => {
  const classes = useStyles()
  const location = useLocation()
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const { user } = session

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line
  }, [location.pathname])

  const signOut = () => {
    dispatch(logoutAction())
    window.location.href = "/login"
  }

  const content = (
    <div {...rest} className={classes.root}>
      <Hidden mdDown>
        <Box display="flex" m={2} mt={4} flexDirection="horizontal">
          <Logo color="white" />
        </Box>
        <Divider className={classes.divider} />
      </Hidden>

      <nav className={classes.navigation}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          {navConfig.map(config => (
            <>
              {renderNavItems({ items: config.items, pathname: location.pathname })}
              <Box my={2}>
                <Divider style={{ backgroundColor: colors.black85 }} />
              </Box>
            </>
          ))}
        </PerfectScrollbar>
      </nav>

      <div className={classes.profile}>
        <Divider className={classes.divider} />
        <Box m={2}>
          <UserInfo variant="h6">{`${user?.firstName} ${user?.lastName}`}</UserInfo>
          <UserLogOut startIcon={<ExitToAppIcon />} onClick={signOut}>
            Sign out
          </UserLogOut>
        </Box>
      </div>
    </div>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}
