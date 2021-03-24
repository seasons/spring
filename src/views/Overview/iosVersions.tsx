import React, { useState } from "react"
import { ControlPanel, Text } from "components"
import ReactApexChart from "react-apexcharts"
import { Box, Card as MuiCard, styled as muiStyled, Typography, Checkbox } from "@material-ui/core"
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
    const series = orderedLabels.map(a => {
      const labelCountsByStatus = data?.result?.[a]
      let overallLabelCount = 0
      if (showActive) {
        overallLabelCount += labelCountsByStatus["active"] || 0
      }
      if (showPaused) {
        overallLabelCount += labelCountsByStatus["paused"] || 0
      }
      if (showAdmissable) {
        overallLabelCount += labelCountsByStatus["admissable"] || 0
      }
      return overallLabelCount
    })
    return series
  }, [showActive, showPaused, showAdmissable])

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

  return x3(
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
          showActive={showActive}
          setShowActive={setShowActive}
          showPaused={showPaused}
          setShowPaused={setShowPaused}
          showAdmissable={showAdmissable}
          setShowAdmissable={setShowAdmissable}
          containerProps={{ style: { right: 10, left: "unset" } }}
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
const ControlPanelText = ({ children }) => <Text variant="body1">{children}</Text>
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
  position: "absolute",
  top: 10,
  right: 10,
  background: theme.palette.primary.main,
  textAlign: "center",
})
