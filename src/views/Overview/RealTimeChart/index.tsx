import {
  Box,
  Button,
  Card,
  CardHeader as MuiCardHeader,
  List,
  ListItem,
  ListItemText,
  styled as muiStyled,
  Typography,
} from "@material-ui/core"
import useIsMountedRef from "hooks/useIsMountedRef"
import React, { useCallback, useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { theme } from "theme/theme"
import { Chart } from "./Chart"

function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min)
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export interface RealTimeChartProps {}
export const RealTimeChart: React.FC<RealTimeChartProps> = () => {
  const isMountedRef = useIsMountedRef()
  const [data, setData] = useState([163, 166, 161, 159, 99, 163, 173, 166, 167, 183, 176, 172])

  const getData = useCallback(() => {
    if (isMountedRef.current) {
      setData(prevData => {
        const newData = [...prevData]

        newData.shift()
        newData.push(0)

        return newData
      })
    }

    setTimeout(() => {
      if (isMountedRef.current) {
        setData(prevData => {
          const newData = [...prevData]
          const random = getRandomInt(100, 200)

          newData.pop()
          newData.push(random)

          return newData
        })
      }
    }, 500)
  }, [isMountedRef])

  useEffect(() => {
    setInterval(() => getData(), 2000)
  }, [getData])

  const labels = data.map((value, i) => i)

  const pages = [
    {
      pathname: "/app/projects",
      views: "24",
    },
    {
      pathname: "/app/chat",
      views: "21",
    },
    {
      pathname: "/cart",
      views: "15",
    },
    {
      pathname: "/cart/checkout",
      views: "8",
    },
  ]

  return (
    <Card>
      <CardHeader
        action={
          <Typography color="inherit" variant="h3">
            {data[data.length - 1] === 0 ? data[data.length - 2] : data[data.length - 1]}
          </Typography>
        }
        subheader="Page views per second"
        subheaderTypographyProps={{ color: "textSecondary", variant: "body2" }}
        title="Active users"
        titleTypographyProps={{ color: "textPrimary" }}
      />
      <Chart data={data} labels={labels} />
      <List>
        {pages.map(page => (
          <ListItem divider key={page.pathname}>
            <ListItemText
              primary={page.pathname}
              primaryTypographyProps={{ color: "textSecondary", variant: "body2" }}
            />
            <Typography color="inherit">{page.views}</Typography>
          </ListItem>
        ))}
      </List>
      <Box p={2} display="flex" justifyContent="flex-end">
        <Button component={RouterLink} size="small" to="#">
          See all
        </Button>
      </Box>
    </Card>
  )
}

const CardHeader = muiStyled(MuiCardHeader)({
  marginTop: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  alignItems: "center",
})
