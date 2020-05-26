import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Button, Typography, Box, Breadcrumbs, Link, Menu, MenuItem, IconButton, styled } from "@material-ui/core"
import { Spacer, Text } from "components"

import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { colors } from "theme"

export interface HeaderProps {
  className?: string
  title: string | JSX.Element
  subtitle?: string | JSX.Element
  primaryButton?: {
    text: string
    icon?: JSX.Element
    action?: () => void
  }
  breadcrumbs?: Array<{ url: string; title: string }>
  menuItems?: Array<{ text: string; action?: () => void }>
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, primaryButton, breadcrumbs, menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display="flex" mt={4} mb={3}>
      <Box flexGrow={1}>
        {breadcrumbs && (
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link variant="body1" color="inherit" to="/" component={RouterLink} key={"/"}>
              Dashboard
            </Link>
            {breadcrumbs?.map(({ title, url }, i) => {
              if (i === breadcrumbs.length - 1) {
                return (
                  <Typography variant="body1" color="textPrimary" key={`nav-item-${i}`}>
                    {title}
                  </Typography>
                )
              }

              return (
                <Link variant="body1" color="inherit" to={url} component={RouterLink} key={url}>
                  {title}
                </Link>
              )
            })}
          </Breadcrumbs>
        )}
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
        <Spacer mt={0.5} />
        {subtitle && (
          <Text variant="h5" opacity={0.5}>
            {subtitle}
          </Text>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        {primaryButton && (
          <Box>
            <Button color="primary" variant="contained" onClick={primaryButton.action} startIcon={primaryButton.icon}>
              {primaryButton.text}
            </Button>
          </Box>
        )}
        {menuItems && (
          <Box mx={2}>
            <BorderedIconButton onClick={handleClick} size="small">
              <MoreHorizIcon />
            </BorderedIconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {menuItems.map((item, i) => (
                <MenuItem
                  key={`menuitem-${item.text + i}`}
                  onClick={() => {
                    handleClose()
                    item?.action?.()
                  }}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  )
}

const BorderedIconButton = styled(IconButton)({
  border: `1px solid ${colors.grey[300]}`,
  padding: "5px",
})
