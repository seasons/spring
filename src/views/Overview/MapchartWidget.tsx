import * as React from "react"
import { Box, Card as MuiCard, Typography, styled as muiStyled } from "@material-ui/core"
import { Spacer, Text, ImageUpload, Header } from "components"

import { useState } from "react"
import ReactMapGL, { Source, Layer, FullscreenControl } from "react-map-gl"
import { theme } from "theme/theme"
import { Checkbox, CheckboxProps } from "@material-ui/core"

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
    latitude: 39.0977,
    longitude: -97.5786,
    zoom: 3,
  })
  const [showActive, setShowActive] = useState(true)
  const [showPaused, setShowPaused] = useState(false)
  const [showAdmissable, setShowAdmissable] = useState(false)
  console.log(data?.result)
  const renderData = React.useMemo(() => {
    const features = data?.result?.filter(a => {
      const props = a.properties
      if (showActive && props.subscriptionStatus === "active") {
        return true
      }
      if (showPaused && props.subscriptionStatus === "paused") {
        return true
      }
      if (showAdmissable) {
        if (props.customerStatus === "Waitlisted" && props.admissable === "Yes") {
          return true
        }
      }
      return false
    })
    return { type: "FeatureCollection", features } as any
  }, [showActive, showPaused, showAdmissable])

  console.log(renderData)
  return (
    <Box style={{ position: "relative" }}>
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        <Source id="my-data" type="geojson" data={renderData}>
          <Layer {...heatmapLayer} />
        </Source>
        <FullscreenControl style={{ left: 10, top: 10 }} />
      </ReactMapGL>
      <Card>
        <Typography
          component="h2"
          style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
          gutterBottom
          variant="overline"
        >
          {data?.title}
        </Typography>
        <CheckFlexbox>
          <Checkbox
            checked={showActive}
            onChange={event => setShowActive(event.target.checked)}
            color="secondary"
            name={"Active"}
          />
          <Text variant="body1">Active</Text>
        </CheckFlexbox>
        <CheckFlexbox>
          <Checkbox
            checked={showPaused}
            onChange={event => setShowPaused(event.target.checked)}
            color="secondary"
            name={"Paused"}
          />
          <Text variant="body1">Paused</Text>
        </CheckFlexbox>
        <CheckFlexbox>
          <Checkbox
            checked={showAdmissable}
            onChange={event => setShowAdmissable(event.target.checked)}
            color="secondary"
            name={"Admissable"}
          />
          <Text variant="body1">Admissable</Text>
        </CheckFlexbox>
      </Card>
    </Box>
  )
}

const CheckFlexbox = muiStyled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
})

const Card = muiStyled(MuiCard)({
  // backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  // height: 250,
  padding: theme.spacing(2),
  position: "absolute",
  top: 10,
  right: 10,
  background: theme.palette.primary.main,
  // padding: theme.spacing(2),
  // borderRadius: 4,
})
