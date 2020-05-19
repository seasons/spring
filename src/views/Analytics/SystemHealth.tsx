import { Box, Card as MUICard, LinearProgress as MUILinearProgress, styled, Typography } from "@material-ui/core"
import React from "react"
import { colors } from "theme"
import { theme } from "theme/theme"

export const SystemHealth: React.FunctionComponent = () => {
  const data = {
    value: 97,
  }

  return (
    <Card>
      <Typography component="h3" gutterBottom variant="overline" style={{ color: colors.white100 }}>
        System Health
      </Typography>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h3" style={{ color: colors.white100 }}>
          {data.value}%
        </Typography>
        <LinearProgress value={data.value} style={{ color: colors.white100 }} color="secondary" variant="determinate" />
      </Box>
    </Card>
  )
}

const LinearProgress = styled(MUILinearProgress)({
  margin: theme.spacing(0, 1),
  flexGrow: 1,
})

const Card = styled(MUICard)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
  padding: theme.spacing(3),
})

export default SystemHealth
