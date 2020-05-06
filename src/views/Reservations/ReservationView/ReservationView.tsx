import React, { useState } from "react"
import { Loading, useQuery } from "react-admin"
import { Container, Box, Typography, Grid, Fab } from "@material-ui/core"
import { Header } from "components/Header"
import { ReservationInfo } from "./ReservationInfo"
import { ProductCard } from "./ProductCard"
import ViewModuleIcon from "@material-ui/icons/ViewModule"
import ListIcon from "@material-ui/icons/List"
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"

export const ReservationView = ({ match, history, props }) => {
  const { id } = match.params
  const [mode, setMode] = useState("grid")

  const { data, loading, error } = useQuery({
    type: "getOne",
    resource: "Reservation",
    payload: { id },
  })

  const handleModeChange = (event, value) => {
    setMode(value)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error("Loading: ", loading, error)
    return (
      <Box>
        <Typography>{error.message}</Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth={false}>
      <Box my={2}>
        <Header
          title="Reservation Details"
          breadcrumbs={[
            {
              title: "Reservations",
              url: "/reservations",
            },
            { title: `Reservation: ${data.reservationNumber}`, url: `/reservations/${data.reservationNumber}` },
          ]}
        />
        <Box my={2}>
          <ReservationInfo reservation={data} />
        </Box>
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
        <Grid container spacing={2}>
          {data.products.map(product => (
            <Grid item md={mode === "grid" ? 4 : 12} sm={mode === "grid" ? 4 : 12} xs={12}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Fab color="primary" aria-label="add">
          <MoveToInboxIcon />
        </Fab>
      </Box>
    </Container>
  )
}
