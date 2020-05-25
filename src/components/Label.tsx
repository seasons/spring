import { Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { ReactNode } from "react"
import { colors } from "theme"

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

export interface LabelProps {
  children: ReactNode
  color?: string
  shape?: LabelShape
  style?: any
  variant?: LabelVariant
}

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  color = colors.grey[600],
  shape = "square",
  style = {},
  variant = "contained",
  ...rest
}) => {
  const classes = useStyles()

  const finalStyle = { ...style }
  if (shape === "rounded") {
    finalStyle.borderRadius = 20
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
    <Typography {...rest} className={classes.root} style={finalStyle} variant="overline">
      {children}
    </Typography>
  )
}
