import React from "react"

import { Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"

export interface HeaderProps {
  title: string
  subtitle: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Grid item xs={12}>
      <Spacer mt={3} />
      <Text variant="h3">{title}</Text>
      <Spacer mt={0.5} />
      <Text variant="h5" opacity={0.5}>
        {subtitle}
      </Text>
      <Spacer mt={4} />
    </Grid>
  )
}
