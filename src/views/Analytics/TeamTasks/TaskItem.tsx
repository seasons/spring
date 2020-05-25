import { IconButton, ListItem, ListItemText, styled, Tooltip } from "@material-ui/core"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import moment, { Moment } from "moment"
import React from "react"
import { theme } from "theme/theme"

export interface TaskItemProps {
  divider: boolean
  task: {
    deadline: Moment
    members: string[]
    title: string
  }
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, divider }) => {
  let deadline = "N/A"

  if (task.deadline) {
    const now = moment()
    const deadlineMoment = moment(task.deadline)

    if (deadlineMoment.isAfter(now) && deadlineMoment.diff(now, "day") < 3) {
      deadline = `${deadlineMoment.diff(now, "day")} days remaining`
    }
  }

  return (
    <ListItem divider={divider}>
      <ListItemText
        primary={task.title}
        primaryTypographyProps={{ variant: "h6", noWrap: true }}
        secondary={deadline}
      />
      <Tooltip title="View task">
        <ViewButton edge="end">
          <OpenInNewIcon fontSize="small" />
        </ViewButton>
      </Tooltip>
    </ListItem>
  )
}

const ViewButton = styled(IconButton)({
  marginLeft: theme.spacing(2),
})
