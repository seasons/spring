import clsx from "clsx"
import { NavItem, Spacer } from "components"
import { LogoMark } from "icons"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"

import { Divider, Drawer, Hidden, Link, List, Theme, Typography, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import navConfig from "./navConfig"
import { colors } from "theme"

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
    marginLeft: theme.spacing(2),
  },
}))

const LogoText = styled(Typography)`
  font-family: "Apercu-Mono", sans-serif;
  color: ${colors.white100};
  letter-spacing: 1px;
  font-weight: 500;
`

const NavBar: React.FC<any> = ({ openMobile, onMobileClose, ...rest }: any) => {
  const classes = useStyles()
  const location = useLocation()
  const session = useSelector(state => state.session)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
  }, [location.pathname])

  const content = (
    <div {...rest} className={clsx(classes.root)}>
      <Box display="flex" m={2} mt={4} flexDirection="horizontal">
        <LogoMark />
        <Spacer ml={2} />
        <LogoText variant="h4">SEASONS</LogoText>
      </Box>

      <Box mt={1} borderBottom={`1px solid ${colors.black85}`}></Box>

      <nav className={classes.navigation}>
        <List>
          {navConfig.map(({ icon, href, title }) => (
            <NavItem icon={icon} key={href} href={href} title={title} />
          ))}
        </List>
      </nav>
      <Divider className={classes.divider} />
      <div className={classes.profile}>
        <div className={classes.details}>
          <Link component={RouterLink} to="/profile/1/timeline" variant="h5" color="textPrimary" underline="none">
            {`${session.user.first_name} ${session.user.last_name}`}
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.desktopDrawer,
      }}
      open
      variant="persistent"
    >
      {content}
    </Drawer>
  )
}

export default NavBar
