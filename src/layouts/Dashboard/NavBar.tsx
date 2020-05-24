import { logout as logoutAction } from "actions/sessionActions"
import { NavItem, Logo } from "components"

import React, { useEffect } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, matchPath } from "react-router"
import styled from "styled-components"
import { colors } from "theme"

import { Box, Drawer, List, Theme, Typography, Hidden, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

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
  },
  desktopDrawer: {
    width: 256,
    height: "100%",
    border: "none",
  },
  navigation: {
    overflow: "auto",
    padding: theme.spacing(2, 2, 2, 2),
    flexGrow: 1,
  },
  divider: {
    backgroundColor: colors.black85,
  },
}))

const UserInfo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.white100};
`

const UserLogOut = styled(UserInfo)`
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: ${colors.black50};
  }
`

function renderNavItems({ items, ...rest }) {
  return <List disablePadding>{items.reduce((acc, item) => reduceChildRoutes({ acc, item, ...rest } as any), [])}</List>
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    })

    acc.push(
      <NavItem depth={depth} icon={item.icon} key={key} info={item.info} open={Boolean(open)} title={item.title}>
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    )
  } else {
    acc.push(<NavItem depth={depth} href={item.href} icon={item.icon} key={key} info={item.info} title={item.title} />)
  }

  return acc
}

export const NavBar: React.FC<any> = ({ openMobile, onMobileClose, ...rest }: any) => {
  const classes = useStyles()
  const location = useLocation()
  const session = useSelector(state => state.session)
  const { user } = session
  const dispatch = useDispatch()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
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
          <List>{navConfig.map(config => renderNavItems({ items: config.items, pathname: location.pathname }))}</List>
        </PerfectScrollbar>
      </nav>

      <div className={classes.profile}>
        <Divider className={classes.divider} />
        <Box m={2}>
          <UserInfo variant="h6">{`${user?.firstName} ${user?.lastName}`}</UserInfo>
          <UserLogOut variant="h6" onClick={signOut}>
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
