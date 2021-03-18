import React from "react"
import { Avatar as MuiAvatar, Box, Card as MuiCard, fade, styled as muiStyled, Typography } from "@material-ui/core"
import Chart from "react-apexcharts"
import { CardContent, useTheme } from "@material-ui/core"
import { theme } from "theme/theme"
import { upperFirst } from "lodash"

export const PiechartWidget = ({ data }) => {
  const alphabetizedLabels = Object.keys(data?.result).sort()
  const renderData = {
    series: alphabetizedLabels.map(a => data?.result?.[a]),
    options: {
      plotOptions: { pie: { customScale: 1.1 } },
      colors: ["#27c6db", "#AA79BC"],
      labels: alphabetizedLabels.map(a => upperFirst(a)),
      legend: {
        show: true,
        position: "bottom",
      },
    },
  }
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <Typography
          component="h2"
          style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
          gutterBottom
          variant="overline"
        >
          {data?.title}
        </Typography>
        <Typography
          component="h2"
          style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
          gutterBottom
          variant="overline"
        >
          {!!data?.subtitle && `(${data?.subtitle})`}
        </Typography>
        <Chart options={renderData.options} series={renderData.series} type="pie" />
      </Box>
    </Card>
  )
}

const Card = muiStyled(MuiCard)({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  height: 250,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
