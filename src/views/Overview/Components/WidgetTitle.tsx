import React from "react"
import { Typography } from "@material-ui/core"
import { theme } from "theme/theme"

export const WidgetTitle = ({ children }) => (
  <Typography
    component="h2"
    style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
    gutterBottom
    variant="overline"
  >
    {children}
  </Typography>
)
