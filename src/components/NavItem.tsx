import React, { ReactNode, useState } from "react"
import { NavLink as RouterLink } from "react-router-dom"
import styled from "styled-components"

import { Box, Button as MuiButton, ListItem as MuiListItem, Collapse, makeStyles } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import { theme } from "theme/theme"

const Button = styled(MuiButton)`
  padding: 10px 10px;
  justify-content: flex-start;
  text-transform: none;
  font-size: 20px;
  letter-spacing: 0;
  width: 100%;
  color: #8b8b8d;

  &:hover {
    background: none;
    color: ${theme.palette.primary.contrastText};
  }

  &.active {
    color: ${theme.palette.primary.contrastText};
    font-weight: bold;

    .active-indicator {
      margin-left: -25px;
      margin-right: 5px;
      width: 20px;
      height: 2px;
      background: black;
    }
  }
`

const LeafButton = styled(Button)`
  font-size: 16px;
  padding-left: 0px;
`

const ListItem = styled(MuiListItem)`
  display: flex;
  padding: 0 12px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

const useStyles = makeStyles(theme => ({
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
}))

export interface NavItemProps {
  children?: ReactNode
  className?: string
  href?: string
  icon: any
  open?: boolean
  title: string
  info?: any
  depth: number
}

export const NavItem: React.FunctionComponent<NavItemProps> = ({
  children,
  href,
  icon: Icon,
  open: openProp = false,
  title,
  depth,
  info: Info,
  ...rest
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(openProp)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  let paddingLeft = 8

  if (depth > 0) {
    paddingLeft = 8 * depth
  }

  const style = { paddingLeft }
  const Btn = depth > 0 ? LeafButton : Button

  if (children) {
    return (
      <>
        <ListItem disableGutters key={title} {...rest} px={2}>
          <Btn onClick={handleToggle} style={style} disableRipple>
            <span className={classes.title}>{title}</span>
            {open ? (
              <ExpandLessIcon fontSize="small" color="inherit" />
            ) : (
              <ExpandMoreIcon fontSize="small" color="inherit" />
            )}
          </Btn>
        </ListItem>

        <Collapse in={open}>
          <Box ml={3}>{children}</Box>
        </Collapse>
      </>
    )
  }

  return (
    <ListItem {...rest} disableGutters key={title} px={2}>
      <Btn component={RouterLink} to={href} style={style} disableRipple>
        <div className="active-indicator"></div>
        <span className={classes.title}>{title}</span>
      </Btn>
      {Info && <Info />}
    </ListItem>
  )
}
