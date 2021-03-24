import React, { useEffect, useState } from "react"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import Chart from "react-apexcharts"
import { theme } from "theme/theme"
import { upperFirst } from "lodash"
import { Checkbox } from "@material-ui/core"
import { Text } from "components"

export interface PiechartWidgetProps {
  data: { title: string; subtitle?: string; result: any }
  controlPanel?: ControlPanelItem[]
  options?: any
  containerProps?: any
}

export interface ControlPanelItem {
  label: string
  defaultChecked: boolean
  onChange: (data: any, alphabetizedLabels: string[], series: Number[], checked: boolean) => any
}

export const PiechartWidget = ({ data, controlPanel = [], options, containerProps }: PiechartWidgetProps) => {
  const alphabetizedLabels = Object.keys(data?.result).sort()

  const renderControlPanel = controlPanel.length > 0
  const initialSeriesMapFunc = renderControlPanel ? a => 0 : a => data?.result?.[a]
  let [series, setSeries] = useState(alphabetizedLabels.map(initialSeriesMapFunc))

  const renderData = {
    series: series,
    options: {
      labels: alphabetizedLabels.map(a => upperFirst(a)),
      legend: {
        show: true,
        position: "bottom",
      },
      ...options,
    },
  }
  return (
    <Card {...containerProps}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
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
        <Chart options={renderData.options} series={renderData.series} type="pie" height="100%" width="100%" />
      </Box>

      {renderControlPanel && (
        <ControlCard>
          {controlPanel.map(a => (
            <ControlPanelItem
              {...a}
              data={data}
              series={series}
              setSeries={setSeries}
              alphabetizedLabels={alphabetizedLabels}
            />
          ))}
        </ControlCard>
      )}
    </Card>
  )
}

export const ControlPanelItem = ({ label, defaultChecked, onChange, data, series, setSeries, alphabetizedLabels }) => {
  const [checked, setChecked] = useState(defaultChecked)
  useEffect(() => {
    if (defaultChecked) {
      const newSeries = onChange(data, alphabetizedLabels, series, checked)
      setSeries(newSeries)
    }
  }, [])
  return (
    <CheckFlexbox>
      <Checkbox
        checked={checked}
        onChange={event => {
          setChecked(event.target.checked)
          const newSeries = onChange(data, alphabetizedLabels, series, event.target.checked)
          setSeries(newSeries)
        }}
        color="secondary"
        name={label}
      />
      <ControlPanelText>{label}</ControlPanelText>
    </CheckFlexbox>
  )
}

const CheckFlexbox = muiStyled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
})

const ControlCard = muiStyled(MuiCard)({
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  position: "absolute",
  top: 10,
  left: 10,
  background: theme.palette.primary.main,
})
const ControlPanelText = ({ children }) => <Text variant="body1">{children}</Text>

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
