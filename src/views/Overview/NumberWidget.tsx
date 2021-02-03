import { Avatar as MuiAvatar, Box, Card as MuiCard, fade, styled as muiStyled, Typography } from "@material-ui/core"
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined"
import { Label } from "components"
import React from "react"
import { colors } from "theme/colors"
import { theme } from "theme/theme"

export interface NumberWidgetProps {
  data: {
    title: string
    result: any[]
  }
  icon?: JSX.Element
}

export const NumberWidget: React.FC<NumberWidgetProps> = ({ data, icon }) => {
  const value = Object.values(data.result)[0].toLocaleString("en-US")

  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <Avatar>{icon}</Avatar>
        <Box my={2}>
          <Typography
            component="h2"
            style={{ color: colors.white100, letterSpacing: 1 }}
            gutterBottom
            variant="overline"
          >
            {data.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h1" style={{ color: colors.white100, fontSize: "56px" }}>
            {value}
          </Typography>
        </Box>
      </Box>
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
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 200,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
