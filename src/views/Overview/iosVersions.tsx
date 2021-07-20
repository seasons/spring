import React, { useState } from "react"
import { ControlPanel, Text } from "components"
import ReactApexChart from "react-apexcharts"
import { Box, Card as MuiCard, styled as muiStyled } from "@material-ui/core"
import { theme } from "theme/theme"

export const IOSVersionsWidget = ({ data }) => {
  const [showActive, setShowActive] = useState(true)
  const [showPaused, setShowPaused] = useState(false)
  const [showAdmissable, setShowAdmissable] = useState(false)

  const orderedLabels = Object.keys(data?.result).sort((a, b) => {
    const [aMajorV, aMinorV, aHellaMinorV] = a.split(".")
    const [bMajorV, bMinorV, bHellaMinorV] = b.split(".")
    if (Number(aMajorV) < Number(bMajorV)) {
      return -1
    }
    if (Number(aMajorV) === Number(bMajorV) && Number(aMinorV) < Number(bMinorV)) {
      return -1
    }
    if (
      Number(aMajorV) === Number(bMajorV) &&
      Number(aMinorV) === Number(bMinorV) &&
      Number(aHellaMinorV) < Number(bHellaMinorV)
    ) {
      return -1
    }
    return 1
  })

  const series = React.useMemo(() => {
    let series
    if (data?.result) {
      series = orderedLabels?.map(a => {
        const labelCountsByStatus = data?.result?.[a]
        let overallLabelCount = 0
        if (showActive) {
          overallLabelCount += labelCountsByStatus?.["active"] || 0
        }
        if (showPaused) {
          overallLabelCount += labelCountsByStatus?.["paused"] || 0
        }
        if (showAdmissable) {
          overallLabelCount += labelCountsByStatus?.["admissable"] || 0
        }
        return overallLabelCount
      })
    }
    return series
  }, [showActive, showPaused, showAdmissable, data])

  const renderData = {
    series: [
      {
        data: series,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: orderedLabels,
      },
    },
  }

  return (
    <Card>
      <Box width="100%" height="100%" position="relative">
        <ReactApexChart
          options={renderData.options}
          series={renderData.series}
          type="bar"
          height={"100%"}
          width="100%"
        />
        <ControlPanel
          title={data?.title}
          items={[
            { setItemChecked: setShowActive, itemChecked: showActive, name: "Active" },
            { setItemChecked: setShowPaused, itemChecked: showPaused, name: "Paused" },
            { setItemChecked: setShowAdmissable, itemChecked: showAdmissable, name: "Admissable" },
          ]}
          containerProps={{ style: { right: 10, top: 10, bottom: "unset", left: "unset" } }}
        />
      </Box>
    </Card>
  )
}

const Card = muiStyled(MuiCard)({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  height: 400,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
})
