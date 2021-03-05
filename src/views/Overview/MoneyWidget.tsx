import { Avatar as MuiAvatar, Box, Card as MuiCard, fade, styled as muiStyled, Typography } from "@material-ui/core"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import { Label } from "components"
import React from "react"
import { colors } from "theme"
import { theme } from "theme/theme"

export interface MoneyWidgetProps {
  data: {
    title: string
    result: any[]
  }
}

export const MoneyWidget: React.FC<MoneyWidgetProps> = ({ data }) => {
  const displayData: { value: string; currency: string; difference: number | null } = {
    value: Object.values(data?.result ?? [""])[0].toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }),
    currency: "$",
    difference: null,
  }

  return (
    <Card>
      <Box flexGrow={1}>
        <Typography
          component="h3"
          style={{ color: theme.palette.primary.contrastText }}
          gutterBottom
          variant="overline"
        >
          {data?.title}
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h3" style={{ color: theme.palette.primary.contrastText }}>
            {displayData.value}
          </Typography>
          {displayData.difference && (
            <Label
              color={displayData.difference > 0 ? theme.palette.primary.contrastText : theme.palette.error.main}
              style={{ height: 10, backgroundColor: fade(theme.palette.error.main, 0.8), marginLeft: theme.spacing(1) }}
            >
              {displayData.difference > 0 ? "+" : ""}
              {displayData.difference}%
            </Label>
          )}
        </Box>
      </Box>
      <Avatar>
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  )
}

const Avatar = muiStyled(MuiAvatar)({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: 48,
  width: 48,
})

const Card = muiStyled(MuiCard)({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: "white",
  height: 40,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
