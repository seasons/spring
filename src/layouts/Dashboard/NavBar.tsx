import { logout as logoutAction } from "actions/sessionActions"
import { NavItem, Logo } from "components"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import styled from "styled-components"
import { colors } from "theme"

import { Box, Drawer, List, Theme, Typography, Hidden } from "@material-ui/core"
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
    padding: theme.spacing(15, 2, 2, 2),
    flexGrow: 1,
  },
  details: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(5),
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
        <Box mt={1} borderBottom={`1px solid ${colors.black85}`}></Box>
      </Hidden>

      <nav className={classes.navigation}>
        <List>
          {navConfig.map(({ icon, href, title }) => (
            <NavItem icon={icon} key={href} href={href} title={title} />
          ))}
        </List>
      </nav>

      <div className={classes.profile}>
        <div className={classes.details}>
          <UserInfo variant="h6">{`${user?.firstName} ${user?.lastName}`}</UserInfo>
          <UserLogOut variant="h6" onClick={signOut}>
            Sign out
          </UserLogOut>
        </div>
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
