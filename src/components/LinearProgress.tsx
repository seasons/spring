import React from "react"

import { createStyles, withStyles, Theme } from "@material-ui/core/styles"
import { Grid, LinearProgress as muiLinearProgress, LinearProgressProps } from "@material-ui/core"

import { Text } from "components"

interface LPProps extends LinearProgressProps {
  barColor?: string | "fff"
}

export const LinearProgress: React.FC<LPProps> = ({ value, variant, barColor }) => {
  const LinearProgressStyled = withStyles((theme: Theme) =>
    createStyles({
      bar: {
        borderRadius: 5,
        backgroundColor: barColor || "#2FC434",
      },
    })
  )(muiLinearProgress)

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={3}>
        <Text variant="h5" style={{ flexGrow: 1 }}>
          {value}%
        </Text>
      </Grid>

      <Grid item xs={9}>
        <LinearProgressStyled value={value} variant={variant} />
      </Grid>
    </Grid>
  )
}
