import { Avatar as MuiAvatar, Box, Card as MuiCard, fade, styled as muiStyled, Typography } from "@material-ui/core"
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined"
import { Label } from "components"
import React from "react"
import { colors } from "theme/colors"
import { theme } from "theme/theme"

export interface WidgetData {
  title: string
  result: any[]
}
export interface NumberWidgetProps {
  data: WidgetData
  icon?: JSX.Element
  getValue?: (WidgetData) => string
}

export const NumberWidget: React.FC<NumberWidgetProps> = ({
  data,
  icon,
  getValue = (data: WidgetData) => Object.values(data?.result)[0].toLocaleString("en-US"),
}) => {
  if (!data) {
    return <></>
  }

  const value = getValue(data)

  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <Avatar>{icon}</Avatar>
        <Box my={2}>
          <Typography
            component="h2"
            style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
            gutterBottom
            variant="overline"
          >
            {data.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h1" style={{ color: theme.palette.primary.contrastText, fontSize: "56px" }}>
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
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  height: 200,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
