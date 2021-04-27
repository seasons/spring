import React, { useEffect, useState } from "react"
import { PiechartWidget } from "./PiechartWidget"

export const DiscoveryWidget = ({ data }) => {
  const [subtitle, setSubtitle] = useState("")
  const [resultToRender, setResultToRender] = useState({})
  const [showLast30Days, setShowLast30Days] = useState(true)
  const [showConvertedOnly, setShowConvertedOnly] = useState(true)

  const rawResultLast30Days = data?.last30Days?.result
  const rawResultAllTime = data?.allTime?.result
  useEffect(() => {
    if (showLast30Days) {
      setResultToRender(rawResultLast30Days?.reduce(createReduceRawResult(showConvertedOnly), {}))
      setSubtitle("Last 30 Days")
    } else {
      setResultToRender(rawResultAllTime?.reduce(createReduceRawResult(showConvertedOnly), {}))
      setSubtitle("Since Apr 07, 2021")
    }
  }, [showLast30Days, showConvertedOnly])

  const piechartData = {
    title: "Discovery Reference",
    subtitle,
    result: resultToRender,
  }
  const controlPanelProps = {
    title: "Discovery Reference",
    items: [
      { setItemChecked: setShowLast30Days, itemChecked: showLast30Days, name: "Last 30 Days" },
      { setItemChecked: setShowConvertedOnly, itemChecked: showConvertedOnly, name: "Subscribed Only" },
    ],
  }
  return <PiechartWidget data={piechartData} controlPanelProps={controlPanelProps} />
}

const createReduceRawResult = showConvertedOnly => (acc, curval) => {
  const counts = curval?.["counts"]?.["subscription.did_subscribe"]
  const totalCount = (showConvertedOnly ? counts?.["Yes"] : counts?.["No"] + counts?.["Yes"]) || 0
  let discoveryRef = curval?.["discoveryReference"]
  if (discoveryRef === null || discoveryRef === "") {
    acc["None"] = (acc["None"] || 0) + totalCount
  } else {
    acc[discoveryRef] = totalCount
  }
  return acc
}
