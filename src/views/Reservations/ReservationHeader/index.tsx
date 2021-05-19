import React, { useState } from "react"

import { Header } from "components"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation } from "react-apollo"
import { useRefresh } from "@seasons/react-admin"
import { ProcessReservationMutationVariables } from "generated/ProcessReservationMutation"
import { MARK_RESERVATION_PICKED, UPDATE_RESERVATION, PROCESS_RESERVATION, MARK_RESERVATION_PACKED } from "../mutations"
import { PickingPackingModal } from "./Components/PickingPackingModal/PickingPackingModal"
import { ProcessReturnModal } from "./Components/ProcessReturnModal/ProcessReturnModal"
import { UpdateStatusModal } from "./Components/UpdateStatusModal/UpdateStatusModal"
import { SUBMIT_QA_ENTRY } from "components/ProductQAModal"
import { useSelector } from "react-redux"
import { omit } from "lodash"
import { ProductStateInput } from "generated/globalTypes"
import { useSnackbarContext } from "components/Snackbar"

export const ReservationHeader = ({ data }) => {
  const [showUpdateStatusModal, toggleUpdateStatusModal] = useState(false)

  const isReservationUnfulfilled = ["Queued", "Picked", "Packed"].includes(data?.status)
  const Modal = isReservationUnfulfilled ? PickingPackingModal : ProcessReturnModal

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
  const [markReservationPacked] = useMutation(MARK_RESERVATION_PACKED, mutationConfig)

  const { showSnackbar } = useSnackbarContext()

  const [updateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted: () => {
      showSnackbar({
        message: "Reservation status updated",
        status: "success",
      })
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
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
        onSave={async (productStates, params = {}) => {
          setIsMutating(true)
          try {
            let message = ``
            if (isReservationUnfulfilled) {
              if (params["status"] === "Picked") {
                await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
              } else if ((params["status"] = "Packed")) {
                await markReservationPacked({ variables: { reservationNumber: data.reservationNumber } })
              }
              setIsMutating(false)
              message = `Reservation status successfully set to ${params["status"]}`
            } else {
              const mutationData: ProcessReservationMutationVariables = {
                data: {
                  reservationNumber: data.reservationNumber,
                  productStates: Object.values(productStates).map((productState: any) =>
                    omit(productState, "damageType")
                  ) as ProductStateInput[],
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
              message = "Returned items successfully processed"
            }

            // TODO: check result to see if there are any backend errors
            refresh()
            toggleModal(false)
            showSnackbar({
              message,
              status: "success",
            })
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
          refresh()
          setIsMutating(false)
          toggleUpdateStatusModal(false)
        }}
        onClose={() => {
          toggleUpdateStatusModal(false)
        }}
      />
    </>
  )
}
