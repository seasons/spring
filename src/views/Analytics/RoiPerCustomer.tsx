import { Avatar as MUIAvatar, Box, Card as MUICard, styled, Typography } from "@material-ui/core"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import React from "react"
import { colors } from "theme"
import { theme } from "theme/theme"

export const RoiPerCustomer: React.FunctionComponent = () => {
  const data = {
    value: "25.50",
    currency: "$",
  }

  return (
    <Card>
      <Box flexGrow={1}>
        <Typography style={{ color: colors.white100 }} component="h3" gutterBottom variant="overline">
          Roi per customer
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography style={{ color: colors.white100 }} variant="h3">
            {data.currency}
            {data.value}
          </Typography>
        </Box>
      </Box>
      <Avatar color="inherit">
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  )
}

const Avatar = styled(MUIAvatar)({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: 48,
  width: 48,
})

const Card = styled(MUICard)({
  borderRadius: 4,
  height: 40,
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export default RoiPerCustomer
