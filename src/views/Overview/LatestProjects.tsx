import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import moment from "moment"
import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Link as RouterLink } from "react-router-dom"
import { theme } from "theme/theme"

export interface LatestProjectsProps {}

export const LatestProjects: React.FC<LatestProjectsProps> = () => {
  const projects = [
    {
      id: 1,
      title: "Mella Full Screen Slider",
      author: {
        name: "Luc Succes",
      },
      currency: "$",
      price: "12,500",
      technologies: [],
      createdAt: Date.now(),
    },
    {
      id: 2,
      title: "Mella Full Screen Slider",
      author: {
        name: "Luc Succes",
      },
      currency: "$",
      price: "12,500",
      technologies: [],
      createdAt: Date.now(),
    },
    {
      id: 3,
      title: "Mella Full Screen Slider",
      author: {
        name: "Luc Succes",
      },
      currency: "$",
      price: "12,500",
      technologies: [],
      createdAt: Date.now(),
    },
    {
      id: 4,
      title: "Mella Full Screen Slider",
      author: {
        name: "Luc Succes",
      },
      currency: "$",
      price: "12,500",
      technologies: [],
      createdAt: Date.now(),
    },
    {
      id: 5,
      title: "Mella Full Screen Slider",
      author: {
        name: "Luc Succes",
      },
      currency: "$",
      price: "12,500",
      technologies: [],
      createdAt: Date.now(),
    },
  ]

  return (
    <Card>
      <CardHeader title="Latest Projects" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={900}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Project Name
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Technology</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(project => (
                <TableRow hover key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box ml={1}>{project.author.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {project.currency}
                    {project.price}
                  </TableCell>
                  <TableCell align="right">{moment(project.createdAt).format("DD MMM, YYYY")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box p={2} display="flex" justifyContent="flex-end">
        <Button component={RouterLink} size="small" to="/app/projects">
          See all
          <StyledNavigateNextIcon />
        </Button>
      </Box>
    </Card>
  )
}

const StyledNavigateNextIcon = styled(NavigateNextIcon)({
  marginLeft: theme.spacing(1),
})
