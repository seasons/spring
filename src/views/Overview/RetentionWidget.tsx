import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import { theme } from "theme/theme"
import { Checkbox } from "@material-ui/core"
import { Text } from "components"
import { WidgetTitle } from "./Components/WidgetTitle"

export const RetentionWidget = ({ data }) => {
  const [showLast12Months, setShowLast12Months] = useState(true)

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
  const allData = adjustedResult?.map(a => ({
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

  const lastTwelveMonthsData = allData.slice(-12).map(a => {
    const newData = a.data.filter(b => {
      const dataMonth = new Date(b["x"])
      const firstMonthInSeries = new Date(allData.slice(-12, -11)[0].name)
      return dataMonth >= firstMonthInSeries
    })
    return { ...a, data: newData }
  })

  const [series, setSeries] = useState(lastTwelveMonthsData)
  useEffect(() => {
    if (!showLast12Months) {
      setSeries(allData)
    } else {
      setSeries(lastTwelveMonthsData)
    }
  }, [showLast12Months])

  const formatAxisDate = value => {
    const d = new Date(value)
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d)
    const year = value?.split("-")?.[0]
    if (month === "Jan") {
      return `Jan ${year.slice(2)}`
    } else {
      return month
    }
  }
  const options = {
    yaxis: {
      labels: {
        formatter: function(value, opt) {
          if (typeof value === "string" && value.length > 0) {
            return formatAxisDate(value)
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
            return formatAxisDate(value)
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
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
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
  }
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1} width="100%">
        <WidgetTitle>{data?.title}</WidgetTitle>
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Chart options={options} series={series} type="heatmap" height={700} width={1000} />
          <ControlPanel showLast12Months={showLast12Months} setShowLast12Months={setShowLast12Months} />
        </Box>
      </Box>
    </Card>
  )
}

const Card = muiStyled(MuiCard)({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
})

const ControlPanel = ({ showLast12Months, setShowLast12Months, containerProps = {} }) => {
  return (
    <ControlPanelCard {...containerProps}>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <WidgetTitle>Customer Retention</WidgetTitle>
        <CheckFlexbox>
          <Checkbox
            checked={showLast12Months}
            onChange={event => setShowLast12Months(event.target.checked)}
            color="secondary"
            name={"ShowLast12Months"}
          />
          <ControlPanelText>Last 12 Months</ControlPanelText>
        </CheckFlexbox>
      </Box>
    </ControlPanelCard>
  )
}

const CheckFlexbox = muiStyled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
})

const ControlPanelCard = muiStyled(MuiCard)({
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  background: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const ControlPanelText = ({ children }) => <Text variant="body1">{children}</Text>
