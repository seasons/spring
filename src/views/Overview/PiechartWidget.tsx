import React from "react"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import Chart from "react-apexcharts"
import { theme } from "theme/theme"
import { upperFirst } from "lodash"
import { WidgetTitle } from "./Components/WidgetTitle"
import { ControlPanel, ControlPanelProps } from "components/ControlPanel"

export interface PiechartWidgetProps {
  data: any
  controlPanelProps?: ControlPanelProps
}

export const PiechartWidget = ({ data, controlPanelProps }: PiechartWidgetProps) => {
  const alphabetizedLabels = Object.keys(data?.result).sort()

  let series = alphabetizedLabels.map(a => data?.result?.[a])

  const renderData = {
    series: series,
    options: {
      labels: alphabetizedLabels.map(a => upperFirst(a)),
      legend: {
        position: "bottom",
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#4CAF50",
        "#546E7A",
        "#A5978B",
        "#C7F464",
        "#F9A3A4",
        "#F9C80E",
        "#5A2A27",
        "#2E294E",
      ],
    },
  }
  return (
    <Card controlPanel={!!controlPanelProps}>
      <Box display="flex" flexDirection="row" justifyContent="center" width="100%">
        {!!controlPanelProps && (
          <ControlPanel
            {...controlPanelProps}
            containerProps={{
              ...controlPanelProps.containerProps,
              style: {
                position: "unset",
                height: "fit-content",
                ...(controlPanelProps?.containerProps?.style || {}),
              },
            }}
          />
        )}
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
          <WidgetTitle>{data?.title}</WidgetTitle>
          <WidgetTitle>{!!data?.subtitle && `(${data?.subtitle})`}</WidgetTitle>
          <Chart
            options={renderData.options}
            series={renderData.series}
            type="pie"
            height={!!controlPanelProps ? "350px" : undefined}
          />
        </Box>
      </Box>
    </Card>
  )
}

const Card = muiStyled(MuiCard)((p: { controlPanel: boolean }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  height: p.controlPanel ? 350 : 250,
  widget: p.controlPanel ? 500 : 250,
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
}))
