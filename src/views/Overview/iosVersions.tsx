import React from "react"
import { PiechartWidget } from "./PiechartWidget"

export const IOSVersionsWidget = ({ data }) => {
  const createOnChange = panelLabel => {
    return (data, alphabetizedLabels, series, checked) => {
      return series.map((a, i) => {
        const dataLabel = alphabetizedLabels[i]
        const delta = data?.result?.[dataLabel]?.[panelLabel] || 0
        if (checked) {
          return a + delta
        } else {
          return (a as any) - delta
        }
      })
    }
  }

  return (
    <PiechartWidget
      data={{ ...data, subtitle: "Last 30 days" }}
      controlPanel={[
        {
          label: "Active",
          onChange: createOnChange("active"),
          defaultChecked: true,
        },
        {
          label: "Paused",
          onChange: createOnChange("paused"),
          defaultChecked: false,
        },
        {
          label: "Admissable",
          onChange: createOnChange("admissable"),
          defaultChecked: false,
        },
      ]}
      // options={{ plotOptions: { pie: { customScale: 2 } } }}
      // containerProps={{ style: { height: "600px" } }}
    />
  )
}
