import clsx from "clsx"
import React from "react"

import { colors, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "inline-block",
    borderRadius: "50%",
    flexGrow: 0,
    flexShrink: 0,
  },
  small: {
    height: theme.spacing(1),
    width: theme.spacing(1),
  },
  medium: {
    height: theme.spacing(2),
    width: theme.spacing(2),
  },
  large: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  default: {
    backgroundColor: colors.grey[50],
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  info: {
    backgroundColor: colors.lightBlue[600],
  },
  warning: {
    backgroundColor: colors.orange[900],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  success: {
    backgroundColor: colors.green[600],
  },
}))

export type StatusBulletColor = "default" | "primary" | "info" | "success" | "warning" | "error"
export type StatusBulletSize = "small" | "medium" | "large"

interface StatusBulletProps {
  className?: string
  color?: StatusBulletColor
  size?: StatusBulletSize
}

export const StatusBullet: React.FunctionComponent<StatusBulletProps> = ({
  className,
  color = "default",
  size = "medium",
  ...rest
}) => {
  const classes = useStyles()
  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes[size]]: size,
      [classes[color]]: color,
    },
    className
  )

  return (
    <span
      {...rest}
      className={rootClassName}
      //
    />
  )
}
