import React from "react"

import { Grid } from "@material-ui/core"

export const ComponentError = () => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={6}>
        Oops, error fetching data. Have you tried unplugging?
      </Grid>
    </Grid>
  )
}
