import { Box, Card, CardHeader, Divider, List } from "@material-ui/core"
import moment from "moment"
import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { TaskItem } from "./TaskItem"

export interface TeamTasksProps {}

export const TeamTasks: React.FC<TeamTasksProps> = () => {
  const tasks = [
    {
      id: 1,
      title: "Update the API for the project",
      members: ["Omar", "Luc", "Kevin"],
      deadline: moment(),
    },
    {
      id: 2,
      title: "Update the API for the project",
      members: ["Omar", "Luc", "Kevin"],
      deadline: moment(),
    },
    {
      id: 3,
      title: "Update the API for the project",
      members: ["Omar", "Luc", "Kevin"],
      deadline: moment(),
    },
    {
      id: 4,
      title: "Update the API for the project",
      members: ["Omar", "Luc", "Kevin"],
      deadline: moment(),
    },
    {
      id: 5,
      title: "Update the API for the project",
      members: ["Omar", "Luc", "Kevin"],
      deadline: moment(),
    },
  ]

  return (
    <Card>
      <CardHeader title="Team Tasks" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={400}>
          <List>
            {tasks.map((task, i) => (
              <TaskItem divider={i < tasks.length - 1} key={task.id} task={task} />
            ))}
          </List>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
