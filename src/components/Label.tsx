import clsx from "clsx"
import React, { ReactNode } from "react"
import { colors as themeColors } from "theme"

import { colors, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: 2,
    lineHeight: "10px",
    fontSize: "10px",
    height: 20,
    minWidth: 20,
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 1),
  },
}))

export type LabelShape = "square" | "rounded"
export type LabelVariant = "contained" | "outlined"

export const IndicatorMap = {
  Authorized: themeColors.status.green,
  Active: themeColors.status.green,
  Waitlisted: themeColors.black15,
  Invited: themeColors.black15,
  Created: themeColors.status.orange,
  Suspended: themeColors.status.orange,
  Paused: themeColors.status.orange,
  Deactivated: themeColors.status.red,
}

export interface LabelProps {
  children: ReactNode
  className?: string
  color?: string
  shape?: LabelShape
  style?: any
  variant?: LabelVariant
}

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  className,
  color = colors.grey[600],
  shape = "square",
  style = {},
  variant = "contained",
  ...rest
}) => {
  const classes = useStyles()
  const rootClassName = clsx(
    {
      [classes.root]: true,
    },
    className
  )
  const finalStyle = { ...style }
  if (shape === "rounded") {
    finalStyle.borderRadius = 10
    finalStyle.padding = 4
  }

  switch (variant) {
    case "contained":
      finalStyle.backgroundColor = color
      finalStyle.color = "#FFF"
      break
    case "outlined":
      finalStyle.border = `1px solid ${color}`
      finalStyle.color = color
      break
  }

  return (
    <Typography {...rest} className={rootClassName} style={finalStyle} variant="overline">
      {children}
    </Typography>
  )
}
