import React from "react"
import { Link as RouterLink, useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"

import { makeStyles } from "@material-ui/styles"
import { AppBar, Button, IconButton, Toolbar, Hidden, Theme, Typography } from "@material-ui/core"

import InputIcon from "@material-ui/icons/Input"
import MenuIcon from "@material-ui/icons/Menu"

import { LogoMark } from "../../Icons/LogoMark"
import { useAuth0 } from "utils/auth0"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  search: {
    backgroundColor: "rgba(255,255,255, 0.1)",
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: "inherit",
  },
  searchInput: {
    flexGrow: 1,
    color: "inherit",
    "& input::placeholder": {
      opacity: 1,
      color: "inherit",
    },
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100,
  },
  searchPopperContent: {
    marginTop: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  chatButton: {
    marginLeft: theme.spacing(1),
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
  navTitle: {
    textDecoration: "none",
    "& h4": {
      color: theme.palette.primary.contrastText,
      display: "inline",
      marginLeft: "10px",
    },
  },
}))

function TopBar({ onOpenNavBarMobile, className, ...rest }: any) {
  const classes = useStyles()
  const history = useHistory()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout()
    history.push("/login")
  }

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <Hidden lgUp>
          <IconButton className={classes.menuButton} color="inherit" onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/" className={classes.navTitle}>
          <LogoMark />
          <Typography variant="h4">Seasons</Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Button className={classes.logoutButton} color="inherit" onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
}

export default TopBar
