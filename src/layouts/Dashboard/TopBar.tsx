/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useHistory } from "react-router"
import PropTypes from "prop-types"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Theme,
} from "@material-ui/core"
import LockIcon from "@material-ui/icons/LockOutlined"
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined"
import PeopleIcon from "@material-ui/icons/PeopleOutline"
import InputIcon from "@material-ui/icons/Input"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import axios from "../../utils/axios"
import NotificationsPopover from "../../Components/NotificationsPopover"
import PricingModal from "../../Components/PricingModal"
import ChatBar from "./ChatBar"
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
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
  trialIcon: {
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  chatButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600],
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
}))

const popularSearches = ["Devias React Dashboard", "Devias", "Admin Pannel", "Project", "Pages"]

function TopBar({ onOpenNavBarMobile, className, ...rest }: any) {
  const classes = useStyles()
  // const history = useHistory()
  const searchRef = useRef(null)
  // const dispatch = useDispatch()
  const notificationsRef = useRef(null)
  const [openSearchPopover, setOpenSearchPopover] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [notifications, setNotifications] = useState([])
  const [openNotifications, setOpenNotifications] = useState(false)
  const [openChatBar, setOpenChatBar] = useState(false)
  const [pricingModalOpen, setPricingModalOpen] = useState(false)

  const handleLogout = () => {
    // history.push("/auth/login")
    // dispatch(logout());
  }

  const handlePricingModalOpen = () => {
    setPricingModalOpen(true)
  }

  const handlePricingModalClose = () => {
    setPricingModalOpen(false)
  }

  const handleChatBarOpen = () => {
    setOpenChatBar(true)
  }

  const handleChatBarClose = () => {
    setOpenChatBar(false)
  }

  const handleNotificationsOpen = () => {
    setOpenNotifications(true)
  }

  const handleNotificationsClose = () => {
    setOpenNotifications(false)
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
        <RouterLink to="/">
          <LogoMark />
        </RouterLink>
        <div className={classes.flexGrow} />

        <Hidden mdDown>
          <Button className={classes.logoutButton} color="inherit" onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <PricingModal onClose={handlePricingModalClose} open={pricingModalOpen} />
      <ChatBar onClose={handleChatBarClose} open={openChatBar} />
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
}

export default TopBar
