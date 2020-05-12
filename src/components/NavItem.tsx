import React, { ReactNode } from "react"
import { NavLink as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { colors } from "theme"

import { Button, ListItem as MuiListItem } from "@material-ui/core"

const NavLink = styled(Button)`
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

const ListItem = styled(MuiListItem)`
  ${({ theme }) => `
  display: "flex",
  padding-top: 0,
  padding-bottom: 0,
  margin-bottom: ${theme.spacing(2)},
`}
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
  return (
    <ListItem {...rest} disableGutters key={title}>
      <NavLink component={RouterLink} to={href}>
        {title}
      </NavLink>
    </ListItem>
  )
}
