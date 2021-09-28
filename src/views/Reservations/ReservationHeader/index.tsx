import React, { useEffect, useState } from "react"

import { Header } from "components"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation } from "react-apollo"
import { useRefresh } from "@seasons/react-admin"
import { ProcessReservationMutationVariables } from "generated/ProcessReservationMutation"
import {
  MARK_RESERVATION_PICKED,
  UPDATE_RESERVATION,
  PROCESS_RESERVATION,
  MARK_RESERVATION_PACKED,
  EARLY_RETURN,
} from "../mutations"
import { PickingPackingModal } from "./Components/PickingPackingModal/PickingPackingModal"
import { ProcessReturnModal } from "./Components/ProcessReturnModal/ProcessReturnModal"
import { UpdateStatusModal } from "./Components/UpdateStatusModal/UpdateStatusModal"
import { EarlyReturnModal } from "./Components/EarlyReturnModal/EarlyReturnModal"
import { SUBMIT_QA_ENTRY } from "components/ProductQAModal"
import { useSelector } from "react-redux"
import { omit } from "lodash"
import { ProductStateInput } from "generated/globalTypes"
import { useSnackbarContext } from "components/Snackbar"
import { useLocation } from "react-router-dom"

export const ReservationHeader = ({ data }) => {
  const [showUpdateStatusModal, toggleUpdateStatusModal] = useState(false)
  const [showEarlyReturnModal, toggleEarlyReturnModal] = useState(false)

  const isReservationUnfulfilled = ["Queued", "Picked", "Packed"].includes(data?.status)
  const Modal = isReservationUnfulfilled ? PickingPackingModal : ProcessReturnModal

  const [showModal, toggleModal] = useState(false)

  const [isMutating, setIsMutating] = useState(false)

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

  const [earlyReturn] = useMutation(EARLY_RETURN, {
    onCompleted: () => {
      showSnackbar({
        message: "Selected items have been successfully returned",
        status: "success",
      })
      setIsMutating(false)
      toggleEarlyReturnModal(false)
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
      setIsMutating(false)
      toggleEarlyReturnModal(false)
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

    if (["Delivered", "Received", "EarlyReturn"].includes(data?.status)) {
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

  const [processReservation] = useMutation<any, ProcessReservationMutationVariables>(PROCESS_RESERVATION, {
    onCompleted: () => {
      showSnackbar({ message: "Returned items successfully processed", status: "success" })
      refresh()
    },
    onError: error => {
      showSnackbar({ message: error?.message, status: "error" })
      refresh()
    },
  })

  const menuItems: any[] = []
  if (["Delivered", "EarlyReturn", "Received", "Shipped"].includes(data?.status)) {
    menuItems.push({
      text: "Early return",
      action: () => {
        toggleEarlyReturnModal(true)
      },
    })
  }

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
      <Modal
        open={showModal}
        onClose={() => toggleModal(false)}
        reservation={data}
        disableButton={isMutating}
        onSave={async (productStates, params) => {
          setIsMutating(true)
          try {
            if (isReservationUnfulfilled) {
              if (params["status"] === "Picked") {
                await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
              } else if ((params["status"] = "Packed")) {
                await markReservationPacked({ variables: { reservationNumber: data.reservationNumber } })
              }
            } else {
              const mutationData: ProcessReservationMutationVariables = {
                data: {
                  reservationNumber: data.reservationNumber,
                  productStates: Object.values(productStates).map((productState: any) =>
                    omit(productState, "damageType")
                  ) as ProductStateInput[],
                  trackingNumber: params.trackingNumber,
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
                    published: false,
                  },
                })
              }

              await processReservation({ variables: mutationData })
              setIsMutating(false)
            }
          } catch (e) {
            console.error(e)
            showSnackbar({
              message: `Error: ${e.message}`,
              status: "error",
            })
          }
        }}
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

      <EarlyReturnModal
        open={showEarlyReturnModal}
        onSave={async (reservationID, physicalProductIDs) => {
          setIsMutating(true)
          await earlyReturn({
            variables: {
              reservationID: reservationID,
              physicalProductIDs: physicalProductIDs,
            },
          })
        }}
        onClose={() => toggleEarlyReturnModal(false)}
        disableButton={true}
        reservation={data}
      />
    </>
  )
}
