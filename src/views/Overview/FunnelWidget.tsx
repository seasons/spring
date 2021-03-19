import React from "react"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import Chart from "react-apexcharts"
import { theme } from "theme/theme"
import { startCase } from "lodash"

export const FunnelWidget = ({ data }) => {
  const alphabetizedLabels = Object.keys(data?.result).sort()
  const formattedLabels = alphabetizedLabels.map(a => startCase(a.replaceAll("_", " ")))
  const step1Value = data?.result?.[alphabetizedLabels?.[0]]
  const renderData = {
    series: [
      {
        data: alphabetizedLabels.map(a => data?.result?.[a]),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },

      dataLabels: {
        enabled: true,
        formatter: function(val, opt) {
          if (opt.dataPointIndex === 0) {
            return ""
          }
          return `${((val / step1Value) * 100).toFixed(0) + "%"}`
        },
      },
      xaxis: {
        categories: formattedLabels,
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
        <Chart options={renderData.options} series={renderData.series} type="bar" />
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
