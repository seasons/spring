import React from "react"
import { AppBar, Box, Hidden, IconButton, Toolbar, SvgIcon } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import styled from "styled-components"
import { Logo } from "components"

const Bar = styled(AppBar)`
  background-color: black;
`

export function TopBar({ onMobileNavOpen, ...rest }) {
  return (
    <Hidden lgUp>
      <Bar {...rest}>
        <Toolbar>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <SvgIcon>
              <MenuIcon />
            </SvgIcon>
          </IconButton>
          <Box ml={2} display="flex"></Box>
          <Logo color="white" />
          <Box ml={2} flexGrow={1}></Box>
        </Toolbar>
      </Bar>
    </Hidden>
  )
}
