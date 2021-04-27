import React, { useEffect, useState } from "react"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import { PiechartWidget } from "./PiechartWidget"

export const DiscoveryWidget = ({ data }) => {
  const [subtitle, setSubtitle] = useState("")
  const [resultToRender, setResultToRender] = useState({})

  // TODO: Include a control panel that takes these two into account
  const [showLast30Days, setShowLast30Days] = useState(true)
  const [showConvertedOnly, setShowConvertedOnly] = useState(true)

  const rawResultLast30Days = data?.last30Days?.result
  const formattedResultLast30Days = rawResultLast30Days?.reduce(reduceRawResult, {})

  console.log(data)
  const rawResultAllTime = data?.allTime?.result
  const formattedResultAllTime = rawResultAllTime?.reduce(reduceRawResult, {})

  useEffect(() => {
    if (showLast30Days) {
      setResultToRender(formattedResultLast30Days)
      setSubtitle("Last 30 Days")
    } else {
      setResultToRender(formattedResultAllTime)
      setSubtitle("Since Apr 07, 2021")
    }
    console.log(resultToRender)
  }, [showLast30Days, showConvertedOnly])

  // Need object of shape {key: value, key: value, key: value}
  const piechartData = {
    title: "Discovery Reference",
    subtitle,
    result: resultToRender,
  }
  return (
    <PiechartWidget
      data={{ ...piechartData, result: resultToRender }}
      controlPanelProps={{
        title: "Discovery Reference",
        items: [{ setItemChecked: setShowLast30Days, itemChecked: showLast30Days, name: "Last 30 Days" }],
        containerProps: { style: { position: "absolute", top: 20, left: 5, bottom: 180 } },
      }}
    />
  )
}

const reduceRawResult = (acc, curval) => {
  const counts = curval?.["counts"]?.["subscription.did_subscribe"]
  const totalCount = counts?.["No"] + counts?.["Yes"]
  let discoveryRef = curval?.["discoveryReference"]
  if (discoveryRef === null || discoveryRef === "") {
    acc["None"] = (acc["None"] || 0) + totalCount
  } else {
    acc[discoveryRef] = totalCount
  }
  return acc
}
