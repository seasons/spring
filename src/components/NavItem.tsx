import React, { ReactNode } from "react"
import { NavLink as RouterLink } from "react-router-dom"

import styled from "styled-components"
import { Button, ListItem, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { colors } from "theme"

const useStyles = makeStyles<Theme>(theme => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(2),
  },
  button: {
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    fontSize: 20,
    letterSpacing: 0,
    width: "100%",
    color: colors.black50,
  },
  icon: {
    color: colors.black50,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  expandIcon: {
    marginLeft: "auto",
    height: 16,
    width: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  active: {
    color: colors.white100,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: colors.white100,
    },
  },
}))

const ListButton = styled(Button)`
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

export interface NavItemProps {
  children?: ReactNode
  className?: string
  href?: string
  icon: any
  open?: boolean
  title: string
}

export const NavItem: React.FunctionComponent<NavItemProps> = ({
  children,
  href,
  icon: Icon,
  open: openProp = false,
  title,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <ListItem {...rest} className={classes.item} disableGutters key={title}>
      <ListButton component={RouterLink} to={href}>
        {title}
      </ListButton>
    </ListItem>
  )
}
