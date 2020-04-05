/* eslint-disable no-unused-vars */
// Packages
import React, { useState, useRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"

// UI
import { makeStyles } from "@material-ui/styles"
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Theme,
  Typography,
} from "@material-ui/core"

// Icons
import InputIcon from "@material-ui/icons/Input"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

// Components
import { LogoMark } from "../../Icons/LogoMark"

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

const popularSearches = ["Devias React Dashboard", "Devias", "Admin Pannel", "Project", "Pages"]

function TopBar({ onOpenNavBarMobile, className, ...rest }: any) {
  const classes = useStyles()
  // const history = useHistory()
  // const dispatch = useDispatch()
  const searchRef = useRef(null)
  const [openSearchPopover, setOpenSearchPopover] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleLogout = () => {
    // history.push("/auth/login")
    // dispatch(logout());
  }

  const handleSearchChange = event => {
    setSearchValue(event.target.value)

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true)
      }
    } else {
      setOpenSearchPopover(false)
    }
  }

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false)
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
          <Typography variant="h4">Seasons Admin</Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div className={classes.search} ref={searchRef}>
            <SearchIcon className={classes.searchIcon} />
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              placeholder="Search people &amp; places"
              value={searchValue}
            />
          </div>
          <Popper anchorEl={searchRef.current} className={classes.searchPopper} open={openSearchPopover} transition>
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper className={classes.searchPopperContent} elevation={3}>
                <List>
                  {popularSearches.map(search => (
                    <ListItem button key={search} onClick={handleSearchPopverClose}>
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Hidden>
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
