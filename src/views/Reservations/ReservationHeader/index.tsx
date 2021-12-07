import React, { useEffect, useState } from "react"
import { Header } from "components"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation } from "react-apollo"
import { useRefresh } from "@seasons/react-admin"
import { ProcessReservationMutationVariables } from "generated/ProcessReservationMutation"
import { MARK_RESERVATION_PICKED, UPDATE_RESERVATION, PROCESS_RESERVATION, MARK_RESERVATION_PACKED } from "../mutations"
import { UpdateStatusModal } from "./Components/UpdateStatusModal/UpdateStatusModal"
import { SUBMIT_QA_ENTRY } from "components/ProductQAModal"
import { useSelector } from "react-redux"
import { omit } from "lodash"
import { ProductStateInput } from "generated/globalTypes"
import { useSnackbarContext } from "components/Snackbar"
import { useLocation } from "react-router-dom"

export const ReservationHeader = ({ data }) => {
  const [showUpdateStatusModal, toggleUpdateStatusModal] = useState(false)

  const isReservationUnfulfilled = ["Queued", "Picked", "Packed"].includes(data?.status)

  const [showModal, toggleModal] = useState(false)

  const [isMutating, setIsMutating] = useState(false)
  // @ts-ignore
  const session = useSelector(state => state.session)

  const [markReservationPicked] = useMutation(MARK_RESERVATION_PICKED, {
    onCompleted: () => {
      setIsMutating(false)
      showSnackbar({ message: `Reservation status successfully set to picked`, status: "success" })
      toggleModal(false)
      refresh()
    },
    onError: error => {
      setIsMutating(false)
      showSnackbar({ message: error.message, status: "error" })
      toggleModal(false)
      refresh()
    },
  })
  const [markReservationPacked] = useMutation(MARK_RESERVATION_PACKED, {
    onCompleted: () => {
      setIsMutating(false)
      showSnackbar({ message: `Reservation status successfully set to packed`, status: "success" })
      toggleModal(false)
      refresh()
    },
    onError: error => {
      setIsMutating(false)
      showSnackbar({ message: error.message, status: "error" })
      toggleModal(false)
      refresh()
    },
  })

  const { showSnackbar } = useSnackbarContext()

  const [updateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted: () => {
      showSnackbar({
        message: "Reservation status updated",
        status: "success",
      })
      setIsMutating(false)
      toggleUpdateStatusModal(false)
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
      setIsMutating(false)
      toggleUpdateStatusModal(false)
      refresh()
    },
  })

  const [submitQAEntry] = useMutation(SUBMIT_QA_ENTRY)

  let primaryButton = () => {
    if (isReservationUnfulfilled) {
      const whatToStart = data?.status === "Queued" ? "Picking" : "Packing"
      return {
        text: `Start ${whatToStart}`,
        action: () => toggleModal(true),
        icon: <ArchiveIcon />,
      }
    }

    if (["Delivered", "Received", "EarlyReturn", "ReturnPending"].includes(data?.status)) {
      return {
        text: "Process Returns",
        action: () => toggleModal(true),
        icon: <MoveToInboxIcon />,
      }
    }

    return null
  }

  const location = useLocation()
  const scannedTrackingNumber: any = location?.state ? location?.state : {}

  useEffect(() => {
    if (scannedTrackingNumber?.trackingNumber) {
      toggleModal(true)
    }
  }, [scannedTrackingNumber])

  const refresh = useRefresh()

  const menuItems: any[] = []

  return (
    <>
      <Header
        title={`Reservation: ${data.reservationNumber}`}
        breadcrumbs={[
          {
            title: "Reservations",
            url: "/reservations",
          },
          {
            title: `Reservation: ${data.reservationNumber}`,
            url: `/reservations/${data.reservationNumber}`,
          },
        ]}
        primaryButton={primaryButton()}
        menuItems={[
          {
            text: "Update status",
            action: () => {
              toggleUpdateStatusModal(true)
            },
          },
          ...menuItems,
        ]}
      />
      <UpdateStatusModal
        open={showUpdateStatusModal}
        reservation={data}
        isMutating={isMutating}
        onSubmit={async values => {
          setIsMutating(true)
          await updateReservation({
            variables: {
              reservationNumber: data.reservationNumber,
              status: values.reservationStatus,
            },
          })
        }}
        onClose={() => {
          toggleUpdateStatusModal(false)
        }}
      />
    </>
  )
}
