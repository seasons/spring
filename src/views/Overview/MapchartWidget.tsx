import * as React from "react"
import { Box, Card as MuiCard, styled as muiStyled } from "@material-ui/core"
import { ControlPanel } from "components"

import { useState } from "react"
import ReactMapGL, { Source, Layer } from "react-map-gl"

// heatmapLayer is from https://github.com/visgl/react-map-gl/tree/6.1-release/examples/heatmap
const MAX_ZOOM_LEVEL = 9
const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, MAX_ZOOM_LEVEL, 3],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      0.9,
      "rgb(255,201,101)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, MAX_ZOOM_LEVEL, 20],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
  },
} as any

export const MapchartWidget = ({ data }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    // center it on the USA
    latitude: 39.0977,
    longitude: -97.5786,
    zoom: 3,
  })
  const [showActive, setShowActive] = useState(true)
  const [showPaused, setShowPaused] = useState(false)
  const [showAdmissable, setShowAdmissable] = useState(false)

  // To keep the data on the wire compact, we merge duplicate
  // points into singletons with a count value. To render though,
  // we need to unfurl those.
  const unfurledData = React.useMemo(() => {
    const features = data?.result?.reduce((acc, curVal) => {
      const count = curVal.properties.count
      for (let i = 0; i < count; i++) {
        acc.push(curVal)
      }
      return acc
    }, [])
    return features
  }, [])

  const renderData = React.useMemo(() => {
    const features = unfurledData.filter(a => {
      const { customerStatus, subscriptionStatus, admissable } = a.properties
      if (showActive && subscriptionStatus === "active") {
        return true
      }
      if (showPaused && subscriptionStatus === "paused") {
        return true
      }
      if (showAdmissable) {
        if (customerStatus === "Waitlisted" && admissable === "Yes") {
          return true
        }
      }
      return false
    })
    return { type: "FeatureCollection", features } as any
  }, [showActive, showPaused, showAdmissable])

  return (
    <Container>
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        <Source id="my-data" type="geojson" data={renderData}>
          <Layer {...heatmapLayer} />
        </Source>
      </ReactMapGL>
      <ControlPanel
        title={data?.title}
        showActive={showActive}
        setShowActive={setShowActive}
        showPaused={showPaused}
        setShowPaused={setShowPaused}
        showAdmissable={showAdmissable}
        setShowAdmissable={setShowAdmissable}
      />
    </Container>
  )
}
const Container = muiStyled(Box)({
  position: "relative",
})