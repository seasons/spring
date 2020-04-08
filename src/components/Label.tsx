import clsx from "clsx"
import { Typography, colors, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { ReactNode } from "react"

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
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5),
  },
}))

export type LabelShape = "square" | "rounded"
export type LabelVariant = "contained" | "outlined"

export interface LabelProps {
  children: ReactNode
  className: string
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
      [classes.rounded]: shape === "rounded",
    },
    className
  )
  const finalStyle = { ...style }

  if (variant === "contained") {
    finalStyle.backgroundColor = color
    finalStyle.color = "#FFF"
  } else {
    finalStyle.border = `1px solid ${color}`
    finalStyle.color = color
  }

  return (
    <Typography {...rest} className={rootClassName} style={finalStyle} variant="overline">
      {children}
    </Typography>
  )
}
