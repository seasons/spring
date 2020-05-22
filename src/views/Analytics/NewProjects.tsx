import { Avatar as MuiAvatar, Box, Card as MuiCard, fade, styled as muiStyled, Typography } from "@material-ui/core"
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined"
import { Label } from "components"
import React from "react"
import { colors } from "theme/colors"
import { theme } from "theme/theme"

export interface NewProjectsProps {}

export const NewProjects: React.FC<NewProjectsProps> = () => {
  const data = {
    value: 12,
    difference: 10,
  }

  return (
    <Card>
      <Box flexGrow={1}>
        <Typography component="h3" style={{ color: colors.white100 }} gutterBottom variant="overline">
          New projects
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h3" style={{ color: colors.white100 }}>
            {data.value}
          </Typography>
          <Label
            color={data.difference > 0 ? theme.palette.primary.main : theme.palette.error.main}
            style={{ height: 10, backgroundColor: fade(theme.palette.error.main, 0.8), marginLeft: theme.spacing(1) }}
          >
            {data.difference > 0 ? "+" : ""}
            {data.difference}%
          </Label>
        </Box>
      </Box>
      <Avatar>
        <FolderOpenIcon />
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
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
