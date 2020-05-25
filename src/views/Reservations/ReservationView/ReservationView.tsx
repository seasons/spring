import React, { useState, useEffect } from "react"
import { useQueryWithStore, Loading } from "@seasons/react-admin"
import { Container, Box, Typography, Grid, Snackbar } from "@material-ui/core"
import { Header } from "components/Header"
import { ReservationInfo } from "./Components/ReservationInfo"
import { ProductCard } from "./Components/ProductCard"
import ViewModuleIcon from "@material-ui/icons/ViewModule"
import ListIcon from "@material-ui/icons/List"
import { ToggleButtonGroup, ToggleButton, Alert, Color } from "@material-ui/lab"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import ArchiveIcon from "@material-ui/icons/Archive"
import { ProcessReturnModal } from "./Components/ProcessReturnModal/ProcessReturnModal"
import { PROCESS_RESERVATION, MARK_RESERVATION_PICKED } from "../mutations"
import { useMutation, ExecutionResult } from "react-apollo"
import { ProcessReservationMutationVariables } from "generated/ProcessReservationMutation"
import { ProductGrid } from "./Components/ProductGrid"
import { PickingModal } from "./Components/PickingModal/PickingModal"
import { GetReservation } from "generated/GetReservation"

export const ReservationView = ({ match, history }) => {
  const { id } = match.params
  const [mode, setMode] = useState("grid")
  const [showModal, toggleModal] = useState(false)

  const { data, loading, error } = useQueryWithStore({
    type: "getOne",
    resource: "Reservation",
    payload: { id },
  })

  const [processReservation] = useMutation<any, ProcessReservationMutationVariables>(PROCESS_RESERVATION)
  const [markReservationPicked] = useMutation(MARK_RESERVATION_PICKED)

  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })

  const handleModeChange = (event, value) => {
    setMode(value)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error("Error: ", loading, error)
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
  }

  const isReservationUnfulfilled = ["New", "InQueue", "OnHold", "Packed"].includes(data.status)
  const isReservationFulfilled = ["Shipped", "InTransit", "Received", "Completed"].includes(data.status)

  const primaryButton = isReservationUnfulfilled
    ? {
        text: "Start Picking",
        action: () => toggleModal(true),
        icon: <ArchiveIcon />,
      }
    : {
        text: "Process Returns",
        action: () => toggleModal(true),
        icon: <MoveToInboxIcon />,
      }

  const Modal = isReservationUnfulfilled ? PickingModal : ProcessReturnModal

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  return (
    <>
      <Container maxWidth={false}>
        <Box py={2}>
          <Header
            title="Reservation Details"
            breadcrumbs={[
              {
                title: "Reservations",
                url: "/reservations",
              },
              { title: `Reservation: ${data.reservationNumber}`, url: `/reservations/${data.reservationNumber}` },
            ]}
            primaryButton={primaryButton}
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
            {mode === "list" ? (
              <ProductGrid products={data.products} />
            ) : (
              data.products.map(product => (
                <Grid
                  item
                  lg={mode === "grid" ? 3 : 12}
                  md={mode === "grid" ? 4 : 12}
                  sm={mode === "grid" ? 4 : 12}
                  xs={12}
                  key={`product-card-${product.id}`}
                >
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
      <Modal
        open={showModal}
        onClose={() => toggleModal(false)}
        reservation={data}
        onSave={async productStates => {
          try {
            let result: ExecutionResult<any> | null = null
            let message = ``
            if (isReservationUnfulfilled) {
              result = await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
              message = "Reservation status successfully set to Picked"
            } else {
              const mutationData: ProcessReservationMutationVariables = {
                data: {
                  reservationNumber: data.reservationNumber,
                  productStates: Object.values(productStates),
                },
              }

              result = await processReservation({ variables: mutationData })
              message = "Returned items successfully processed"
            }

            // TODO: check result to see if there are any backend errors
            console.log("Result: ", result)

            toggleModal(false)
            toggleSnackbar({
              show: true,
              message,
              status: "success",
            })
          } catch (e) {
            console.error(e)
            toggleSnackbar({
              show: true,
              message: `Error: ${e.message}`,
              status: "error",
            })
          }
        }}
      />
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
