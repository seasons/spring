import React, { ReactNode } from "react"

import { Typography } from "@material-ui/core"
import { Variant as TypographyVariant } from "@material-ui/core/styles/createTypography"

export interface TextProps {
  children: ReactNode
  color?: string
  opacity?: number
  style?: any
  variant?: TypographyVariant
  onClick?: () => void
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  color = "#000000",
  opacity = 1,
  variant,
  style = {},
  onClick,
  ...rest
}) => {
  const finalStyle = { ...style }
  finalStyle.color = color
  finalStyle.opacity = opacity
  return (
    <Typography {...rest} variant={variant} style={finalStyle} onClick={onClick}>
      {children}
    </Typography>
  )
}
