import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { colors, Theme, Typography } from '@material-ui/core';
import { Variant as TypographyVariant } from '@material-ui/core/styles/createTypography';

export interface TextProps {
  children: ReactNode
  color?: string
  style?: any
  variant?: TypographyVariant
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  color = colors.grey[600],
  variant = "h1",
  style = {},
  ...rest
}) => {
  return (
    <Typography {...rest} style={style} variant={variant}>
      {children}
    </Typography>
  )
}
