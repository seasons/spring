import React from "react"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import Chart from "react-apexcharts"
import { theme } from "theme/theme"
import { upperFirst } from "lodash"
import { WidgetTitle } from "./Components/WidgetTitle"

export const PiechartWidget = ({ data }) => {
  const alphabetizedLabels = Object.keys(data?.result).sort()

  let series = alphabetizedLabels.map(a => data?.result?.[a])

  const renderData = {
    series: series,
    options: {
      labels: alphabetizedLabels.map(a => upperFirst(a)),
      legend: {
        position: "bottom",
      },
    },
  }
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
        <WidgetTitle>{data?.title}</WidgetTitle>
        <WidgetTitle>{!!data?.subtitle && `(${data?.subtitle})`}</WidgetTitle>
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
  position: "relative",
})
