import React, { useState } from "react"
import { Container, Box, Typography, Grid, Tabs, Tab } from "@material-ui/core"
import ViewModuleIcon from "@material-ui/icons/ViewModule"
import ListIcon from "@material-ui/icons/List"
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab"

import { ReservationInfo } from "./Components/ReservationInfo"
import { ProductGrid } from "./Components/ProductGrid"
import { ProductCard } from "./Components/ProductCard"
import { useRefresh } from "@seasons/react-admin"
import { Spacer } from "components"
import { TrackingInfo } from "../ReservationView/Components/TrackingInfo"

export interface ReserationManageViewProps {
  match: any
  data: any
}

export const OverviewView: React.FunctionComponent<ReserationManageViewProps> = ({ match, data }) => {
  const [mode, setMode] = useState("grid")

  const refresh = useRefresh()

  const handleModeChange = (event, value) => {
    setMode(value)
  }

  if (!data) {
    alert("no data")
    return <>{"hi"}</>
  }

  return (
    <Box>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <Box mt={1} mb={2}>
              <Typography variant="h3">Info</Typography>
            </Box>
            <ReservationInfo reservation={data} />
          </Grid>
          <Grid item sm={12} md={9}>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={2}>
              <Typography variant="h3">Items</Typography>
              <Box display="flex" alignItems="center">
                <ToggleButtonGroup exclusive onChange={handleModeChange} size="small" value={mode}>
                  <ToggleButton value="grid">
                    <ViewModuleIcon />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ListIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box mb={4}>
              <Grid container spacing={2}>
                {mode === "list" ? (
                  <ProductGrid products={data.products} />
                ) : (
                  data.products.map(product => (
                    <Grid
                      item
                      lg={mode === "grid" ? 4 : 12}
                      md={mode === "grid" ? 4 : 12}
                      sm={mode === "grid" ? 4 : 12}
                      xs={12}
                      key={`product-card-${product.id}`}
                    >
                      <ProductCard product={product} onSave={() => refresh()} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
            <Spacer mt={3} />
            <TrackingInfo packageEvents={data?.packageEvents} />
            <Spacer mt={3} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
