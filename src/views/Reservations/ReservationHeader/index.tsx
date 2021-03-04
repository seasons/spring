import React, { useState } from "react"

import { Header, Snackbar } from "components"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation, ExecutionResult } from "react-apollo"
import { useRefresh } from "@seasons/react-admin"
import { ProcessReservationMutationVariables } from "generated/ProcessReservationMutation"
import { SnackbarState } from "components/Snackbar"
import { MARK_RESERVATION_PICKED, UPDATE_RESERVATION, PROCESS_RESERVATION } from "../mutations"
import { PickingModal } from "./Components/PickingModal/PickingModal"
import { ProcessReturnModal } from "./Components/ProcessReturnModal/ProcessReturnModal"
import { UpdateStatusModal } from "./Components/UpdateStatusModal/UpdateStatusModal"
import { SUBMIT_QA_ENTRY } from "components/ProductQAModal"
import { useSelector } from "react-redux"

export const ReservationHeader = ({ data }) => {
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const [showUpdateStatusModal, toggleUpdateStatusModal] = useState(false)

  const isReservationUnfulfilled = ["Queued", "Packed"].includes(data?.status)
  const Modal = isReservationUnfulfilled ? PickingModal : ProcessReturnModal

  const [showModal, toggleModal] = useState(false)

  const [isMutating, setIsMutating] = useState(false)

  const session = useSelector(state => state.session)

  const mutationConfig = {
    onCompleted: () => {
      setIsMutating(false)
      refresh()
    },
    onError: () => {
      setIsMutating(false)
      refresh()
    },
  }

  const [markReservationPicked] = useMutation(MARK_RESERVATION_PICKED, mutationConfig)

  const [updateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Reservation status updated",
        status: "success",
      })
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const [submitQAEntry] = useMutation(SUBMIT_QA_ENTRY)

  let primaryButton = () => {
    if (isReservationUnfulfilled) {
      return {
        text: "Start Picking",
        action: () => toggleModal(true),
        icon: <ArchiveIcon />,
      }
    }

    if (["Delivered", "Received"].includes(data?.status)) {
      return {
        text: "Process Returns",
        action: () => toggleModal(true),
        icon: <MoveToInboxIcon />,
      }
    }

    return null
  }

  const refresh = useRefresh()

  const [processReservation] = useMutation<any, ProcessReservationMutationVariables>(
    PROCESS_RESERVATION,
    mutationConfig
  )

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
        ]}
      />
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

              // Create PhysicalProductQualityEntry records
              const productStateArr = Object.values(productStates) as any[]

              for (let i = 0; i < productStateArr.length; i++) {
                const productState = productStateArr[i]
                const product = data.products?.[i]
                await submitQAEntry({
                  variables: {
                    notes: productState.notes,
                    type: productState.damageType?.[0],
                    damageTypes: productState.damageType,
                    physicalProductID: product.id,
                    userID: session.user.id,
                  },
                })
              }

              result = await processReservation({ variables: mutationData })
              setIsMutating(false)
              message = "Returned items successfully processed"
            }

            // TODO: check result to see if there are any backend errors
            refresh()
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
      <UpdateStatusModal
        open={showUpdateStatusModal}
        toggleSnackbar={toggleSnackbar}
        reservation={data}
        isMutating={isMutating}
        onSubmit={async values => {
          setIsMutating(true)
          const result = await updateReservation({
            variables: {
              reservationNumber: data.reservationNumber,
              status: values.reservationStatus,
            },
          })
          refresh()
          setIsMutating(false)
          toggleUpdateStatusModal(false)
        }}
        onClose={() => {
          toggleUpdateStatusModal(false)
        }}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
