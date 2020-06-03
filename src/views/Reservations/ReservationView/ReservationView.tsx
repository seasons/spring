import React, { useState } from "react"
import { Error, useQueryWithStore, Loading, useRefresh } from "@seasons/react-admin"
import { Container, Box, Typography, Grid } from "@material-ui/core"
import { Header, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
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

export const ReservationView = ({ match, history }) => {
  const { id } = match.params
  const [mode, setMode] = useState("grid")
  const [showModal, toggleModal] = useState(false)

  const refresh = useRefresh()
  const { data, loading, error } = useQueryWithStore({
    type: "getOne",
    resource: "Reservation",
    payload: { id },
  })

  const [isMutating, setIsMutating] = useState(false)
  const [processReservation] = useMutation<any, ProcessReservationMutationVariables>(PROCESS_RESERVATION, {
    onCompleted: () => {
      setIsMutating(false)
      refresh()
    },
    onError: () => {
      setIsMutating(false)
      refresh()
    },
  })
  const [markReservationPicked] = useMutation(MARK_RESERVATION_PICKED)

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
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

  if (error && !data) {
    console.error("Error: ", loading, error)
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
    return <Error />
  }

  const isReservationUnfulfilled = ["New", "InQueue", "OnHold", "Packed"].includes(data?.status)

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

  if (!data) {
    return <></>
  }

  return (
    <>
      <Container maxWidth={false}>
        <Header
          title={`Reservation: ${data.reservationNumber}`}
          breadcrumbs={[
            {
              title: "Reservations",
              url: "/reservations",
            },
            { title: `Reservation: ${data.reservationNumber}`, url: `/reservations/${data.reservationNumber}` },
          ]}
          primaryButton={primaryButton}
          menuItems={[
            {
              text: "Update status",
              action: () => {
                console.log("Update status")
              },
            },
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
      </Container>
      <Modal
        open={showModal}
        onClose={() => toggleModal(false)}
        reservation={data}
        disableButton={isMutating}
        onSave={async productStates => {
          setIsMutating(true)
          try {
            let result: ExecutionResult<any> | null = null
            let message = ``
            if (isReservationUnfulfilled) {
              result = await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
              setIsMutating(false)
              message = "Reservation status successfully set to Picked"
            } else {
              const mutationData: ProcessReservationMutationVariables = {
                data: {
                  reservationNumber: data.reservationNumber,
                  productStates: Object.values(productStates),
                },
              }

              result = await processReservation({ variables: mutationData })
              setIsMutating(false)
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
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
