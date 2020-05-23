import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core"
import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Chart } from "./Chart"

export interface HistogramChartProps {}

export const HistogramChart: React.FC<HistogramChartProps> = () => {
  const performance = {
    thisWeek: {
      data: [],
      labels: [],
    },
    thisMonth: {
      data: [],
      labels: [],
    },
    thisYear: {
      data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  }

  return (
    <Card>
      <CardHeader title="Performance Over Time" />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
          <Box height={375} minWidth={500}>
            <Chart data={performance.thisYear.data} labels={performance.thisYear.labels} />
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  )
}
