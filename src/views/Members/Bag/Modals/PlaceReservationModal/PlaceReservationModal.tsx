import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { ConfirmationDialog } from "components"
import { useSnackbarContext } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"
import gql from "graphql-tag"

const PLACE_RESERVATION = gql`
  mutation placeReservation($customerID: ID!) {
    reserveItemsForCustomer(customerID: $customerID, shippingCode: UPSGround) {
      id
      reservationNumber
    }
  }
`

export const PlaceReservationModal = ({ open, onClose, customer }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [placeReservation] = useMutation(PLACE_RESERVATION, {
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })
  const { showSnackbar } = useSnackbarContext()
  const refresh = useRefresh()

  useEffect(() => {
    setOpenConfirmDialog(open)
  }, [open])

  return (
    <ConfirmationDialog
      title="Place Reservation"
      body={"Are you sure you want to place this reservation? This will charge the customer."}
      open={openConfirmDialog}
      setOpen={setOpenConfirmDialog}
      onClose={async (agreed: boolean) => {
        if (agreed) {
          try {
            const res = await placeReservation({
              variables: {
                customerID: customer.id,
              },
            })
            refresh()
            const data = res.data.reserveItemsForCustomer
            showSnackbar({
              message: "Reservation placed, Order #" + data.reservationNumber,
              status: "success",
            })
            onClose?.()
          } catch (e) {
            showSnackbar({
              message: "Could no place reservation: " + (e as any).message,
              status: "error",
            })
          }
        }
      }}
    />
  )
}
