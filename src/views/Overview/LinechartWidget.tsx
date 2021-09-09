import React from "react"
import { Box, Card as MuiCard, styled as muiStyled } from "@material-ui/core"
import Chart from "react-apexcharts"
import { theme } from "theme/theme"
import moment from "moment"
import { WidgetTitle } from "./Components/WidgetTitle"

// Currently over-focused on monthly time series. Would need to generalize for
// other usecases
export const LinechartWidget = ({ data }) => {
  if (!data?.result) {
    return <></>
  }
  const alphabetizedLabels = Object.keys(data?.result).sort()
  const formattedLabels = alphabetizedLabels.map(a => {
    const d = moment(a)
    const isFirstMonth = d.year() === 2019 && d.month() === 10
    const isJanuary = d.month() === 0
    const format = isFirstMonth || isJanuary ? "MMM YY" : "MMM"
    return d.format(format)
  })
  const renderData = {
    series: [
      {
        data: alphabetizedLabels.map(a => data?.result?.[a]),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: formattedLabels,
        labels: {
          rotate: -45,
          rotateAlways: true,
        },
      },
    },
  }

  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <WidgetTitle>{data?.title}</WidgetTitle>
        <WidgetTitle>{!!data?.subtitle && `(${data?.subtitle})`}</WidgetTitle>
        <Chart options={renderData.options} series={renderData.series} type="line" width="300%" height={300} />
      </Box>
    </Card>
  )
}

const Card = muiStyled(MuiCard)({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  // height: 250,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
