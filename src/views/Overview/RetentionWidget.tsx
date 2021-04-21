import React from "react"
import Chart from "react-apexcharts"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import { theme } from "theme/theme"
export const RetentionWidget = ({ data }) => {
  // We didn't add any customers in 04 2020. So we fib some data there to make
  // the graph cleaner
  const adjustedResult = [
    ...data?.result?.slice(0, 5),
    {
      cohort: "2020-04",
      counts: Object.keys(data?.result?.[0]?.counts).reduce((acc, curval) => {
        acc[curval] = null
        if (new Date(curval) >= new Date("2020-04")) {
          acc[curval] = 0
        }
        return acc
      }, {}),
    },
    ...data?.result.slice(5),
  ]
  const series = adjustedResult?.map(a => ({
    name: a.cohort,
    data: Object.keys(a.counts).map(thisMonth => {
      const cohortStartMonth = a.cohort
      const initialCohortSize = a.counts[cohortStartMonth]
      const retainedCustomersInGivenMonth = a.counts[thisMonth]

      let valueToRender
      if (initialCohortSize === 0) {
        valueToRender = 0
      } else if (retainedCustomersInGivenMonth === null) {
        valueToRender = null
      } else if (new Date(thisMonth) < new Date(cohortStartMonth)) {
        valueToRender = null
      } else if (thisMonth === cohortStartMonth) {
        valueToRender = initialCohortSize
      } else {
        valueToRender = Math.round((retainedCustomersInGivenMonth / initialCohortSize) * 100) / 100
      }

      return { x: thisMonth, y: valueToRender }
    }),
  }))
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1} width="100%">
        <Typography
          component="h2"
          style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
          gutterBottom
          variant="overline"
        >
          {data?.title}
        </Typography>
        <Chart
          options={{
            yaxis: {
              title: { text: "Cohort Month", style: { color: "#000" } },

              labels: {
                offsetX: 3,
                formatter: function(value, opt) {
                  if (typeof value === "string" && value.length > 0) {
                    const d = new Date(value)
                    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d)
                    const year = value?.split("-")?.[0]
                    if (month === "Jan" || (month === "Oct" && year === "2019")) {
                      return `${month} ${year}`
                    } else {
                      return month
                    }
                  }
                  if (typeof value === "number") {
                    if (!!opt) {
                      const { series, seriesIndex, dataPointIndex } = opt
                      if (dataPointIndex === seriesIndex) {
                        return `${value} subscriptions created`
                      }
                      const percentageRetained = series[seriesIndex][dataPointIndex]
                      const initialCohortSize = series[seriesIndex][seriesIndex]
                      const numRetained = Math.round(percentageRetained * initialCohortSize)
                      return `${numRetained} customers billed`
                    }
                    return value
                  }
                  return value
                },
              },
            },
            xaxis: {
              labels: {
                formatter: function(value) {
                  if (typeof value === "string" && value.length > 0) {
                    const d = new Date(value)
                    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d)
                    const year = value?.split("-")?.[0]
                    if (month === "Jan" || (month === "Oct" && year === "2019")) {
                      return `${month} ${year}`
                    } else {
                      return month
                    }
                  }
                  return value
                },
              },
            },
            dataLabels: {
              enabled: true,
              formatter: function(val, opt) {
                const { seriesIndex, dataPointIndex } = opt

                if (dataPointIndex > seriesIndex) {
                  return `${Math.round(val * 100)}%`
                }

                return val
              },
            },
            legend: {
              show: false,
            },
            chart: {
              height: 600,
              innerWidth: "100%",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              title: "Customer Retention by Monthly Cohort",
              heatmap: {
                radius: 10,
                dataLabels: { enabled: false },
                colorScale: {
                  ranges: [
                    { from: null, to: null, color: "#E9E9EB", name: "Empty" },
                    {
                      from: 1,
                      to: 10000,
                      color: "#0000ff",
                      foreColor: "#000000",
                      name: "Initial Cohort Size OR 100%",
                    },
                    { from: 0.67, to: 0.99, color: "#00bfff", foreColor: "#000000", name: "2/3 Retention or More" },
                    { from: 0.34, to: 0.66, color: "#ace5ee", foreColor: "#000000", name: "1/3 - 2/3 Retention" },
                    {
                      from: 0.01,
                      to: 0.33,
                      color: "#e7feff",
                      foreColor: "#000000",
                      name: "1/3 Retention or Less",
                    },
                  ],
                },
              },
            },
          }}
          series={series}
          type="heatmap"
          height={700}
          width={1000}
        />
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
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
})
