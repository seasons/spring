import {
  Box,
  Card as MuiCard,
  LinearProgress as MuiLinearProgress,
  styled as muiStyled,
  Typography,
} from "@material-ui/core"
import React from "react"
import { colors } from "theme"
import { theme } from "theme/theme"

export interface SystemHealthProps {}

export const SystemHealth: React.FC<SystemHealthProps> = () => {
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

const LinearProgress = muiStyled(MuiLinearProgress)({
  margin: theme.spacing(0, 1),
  flexGrow: 1,
})

const Card = muiStyled(MuiCard)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
  padding: theme.spacing(3),
})
