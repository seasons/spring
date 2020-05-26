import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Button, Grid, Typography, Box, Breadcrumbs, Link } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { Spacer, Text } from "components"

export interface HeaderProps {
  className?: string
  title: string | JSX.Element
  subtitle?: string | JSX.Element
  primaryButton?: {
    text: String
    icon?: JSX.Element
    action?: () => void
  }
  breadcrumbs?: Array<{ url: string; title: string }>
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, primaryButton, breadcrumbs }) => {
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
      <Box>
        {primaryButton && (
          <Grid item>
            <Button color="primary" variant="contained" onClick={primaryButton.action} startIcon={primaryButton.icon}>
              {primaryButton.text}
            </Button>
          </Grid>
        )}
      </Box>
    </Box>
  )
}
