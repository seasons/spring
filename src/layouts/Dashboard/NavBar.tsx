import { logout as logoutAction } from "actions/sessionActions"
import { NavItem, Logo } from "components"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import styled from "styled-components"

import { Box, Drawer, List, Theme, Typography, Hidden, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import "react-perfect-scrollbar/dist/css/styles.css"
import navConfig from "./navConfig"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.primary.main,
    textColor: theme.palette.primary.contrastText,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "#BABABC",
  },
}))

const UserInfo = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
`

const UserLogOut = styled(Button)`
  margin-top: 10px;
  cursor: pointer;
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
    acc.push(
      <NavItem
        key={key}
        depth={depth}
        icon={item.icon}
        info={item.info}
        open={typeof item.open === "boolean" ? item.open : true}
        title={item.title}
      >
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

export const NavBar: React.FC<any> = ({ openMobile, onMobileClose, openSearch, ...rest }: any) => {
  const classes = useStyles()
  const location = useLocation()
  // @ts-ignore
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
          <Logo color="black" />
        </Box>
      </Hidden>

      <nav className={classes.navigation}>
        <Box width="100%">
          {navConfig.map((config, i) => (
            <Box key={`globalnav-${i}`}>{renderNavItems({ items: config.items, pathname: location.pathname })}</Box>
          ))}
        </Box>
      </nav>

      <div className={classes.profile}>
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
