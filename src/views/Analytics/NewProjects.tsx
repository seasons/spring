import { Avatar as MUIAvatar, Box, Card as MUICard, styled, Typography } from "@material-ui/core"
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined"
import React from "react"
import { colors } from "theme/colors"
import { theme } from "theme/theme"

export const NewProjects: React.FunctionComponent = () => {
  const data = {
    value: 12,
    difference: -10,
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
          <Typography style={{ color: colors.white100, marginLeft: theme.spacing(1) }}>
            {data.difference > 0 ? "+" : ""}
            {data.difference}%
          </Typography>
        </Box>
      </Box>
      <Avatar>
        <FolderOpenIcon />
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
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export default NewProjects
