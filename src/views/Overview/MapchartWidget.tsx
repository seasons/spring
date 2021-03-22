import React, { Component } from "react"
import USAMap from "react-usa-map"
import { Box, Card as MuiCard, styled as muiStyled, Typography } from "@material-ui/core"
import { scaleQuantize } from "d3-scale"

export const MapchartWidget = () => {
  /* mandatory */
  const mapHandler = event => {
    alert(event.target.dataset.name)
  }

  const colorScale = scaleQuantize()
    .domain([1, 10])
    .range(["#ffedea", "#ffcec5", "#ffad9f", "#ff8a75", "#ff5533", "#e2492d", "#be3d26", "#9a311f", "#782618"])

  /* optional customization of filling per state and calling custom callbacks per state */
  const statesCustomConfig = () => {
    return {
      NJ: {
        fill: colorScale(0),
        clickHandler: event => console.log("Custom handler for NJ", event.target.dataset),
      },
      NY: {
        fill: colorScale(10),
      },
    }
  }

  return (
    <Box className="App">
      <USAMap customize={statesCustomConfig()} onClick={mapHandler} />
    </Box>
  )
}
