import React, { ReactNode, useState } from "react"
import { NavLink as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { colors } from "theme"

import { Box, Button as MuiButton, ListItem as MuiListItem, Collapse, makeStyles } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"

const Button = styled(MuiButton)`
  padding: 10px 8px;
  justify-content: flex-start;
  text-transform: none;
  font-size: 18px;
  letter-spacing: 0;
  width: 100%;
  color: ${colors.black50};

  &.active {
    color: ${colors.white100};
    font-weight: medium;
  }
`

const LeafButton = styled(Button)`
  font-size: 16px;
`

const ListItem = styled(MuiListItem)`
  display: flex;
  padding-top: 0;
  padding-bottom: 0;
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
    paddingLeft = 32 + 8 * depth
  }

  const style = { paddingLeft }
  const Btn = depth > 0 ? LeafButton : Button
  const key = Math.floor(Math.random() * Math.floor(10000))

  if (children) {
    return (
      <>
        <ListItem key={key} disableGutters {...rest}>
          <Btn onClick={handleToggle} style={style}>
            {Icon && <Icon className={classes.icon} size="20" />}
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
    <ListItem key={key} {...rest} disableGutters>
      <Btn component={RouterLink} to={href}>
        {Icon && <Icon className={classes.icon} size="20" />}
        {title}
      </Btn>
      {Info && <Info />}
    </ListItem>
  )
}
