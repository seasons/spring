import { useSnackbarContext } from "components/Snackbar"
import React, { useState } from "react"
import { BagColumns } from "./BagColumns"
import { PickingPackingModal } from "./Modals/PickingPackingModal/PickingPackingModal"
import { ProcessReturnModal } from "./Modals/ProcessReturnModal/ProcessReturnModal"

enum Modals {
  ProcessReturnModal = "ProcessReturnModal",
  PickingModal = "PickingModal",
  PackingModal = "PackingModal",
}

export const BagView = ({ customer, adminKey }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [showModal, setShowModal] = useState<Modals | null>(null)
  const [modalBagItems, setModalBagItems] = useState([])
  const { showSnackbar } = useSnackbarContext()

  const bagSections = customer?.bagSections
  console.log("bag sections", bagSections)

  return (
    <>
      <BagColumns bagSections={bagSections} setModalBagItems={setModalBagItems} setShowModal={setShowModal} />
      <ProcessReturnModal
        open={showModal === "ProcessReturnModal"}
        onClose={() => setShowModal(null)}
        bagItems={modalBagItems}
        disableButton={isMutating}
        onSave={async (productStates, params) => {
          setIsMutating(true)
          try {
            // FIXME:
            // if (isReservationUnfulfilled) {
            //   if (params["status"] === "Picked") {
            //     await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
            //   } else if ((params["status"] = "Packed")) {
            //     await markReservationPacked({ variables: { reservationNumber: data.reservationNumber } })
            //   }
            // } else {
            //   const mutationData: ProcessReservationMutationVariables = {
            //     data: {
            //       reservationNumber: data.reservationNumber,
            //       productStates: Object.values(productStates).map((productState: any) =>
            //         omit(productState, "damageType")
            //       ) as ProductStateInput[],
            //       trackingNumber: params.trackingNumber,
            //     },
            //   }
            //   // Create PhysicalProductQualityEntry records
            //   const productStateArr = Object.values(productStates) as any[]
            //   for (let i = 0; i < productStateArr.length; i++) {
            //     const productState = productStateArr[i]
            //     const product = data.products?.[i]
            //     await submitQAEntry({
            //       variables: {
            //         notes: productState.notes,
            //         type: productState.damageType?.[0],
            //         damageTypes: productState.damageType,
            //         physicalProductID: product.id,
            //         userID: session.user.id,
            //         published: false,
            //       },
            //     })
            //   }
            //   await processReservation({ variables: mutationData })
            //   setIsMutating(false)
            // }
          } catch (e) {
            console.error(e)
            showSnackbar({
              message: `Error: ${e.message}`,
              status: "error",
            })
          }
        }}
      />
      <PickingPackingModal
        open={showModal === "PickingModal" || showModal === "PackingModal"}
        onClose={() => setShowModal(null)}
        mode={showModal === "PickingModal" ? "Pick" : "Pack"}
        disableButton={isMutating}
        bagItems={modalBagItems}
        onSave={async (productStates, params) => {
          setIsMutating(true)
          try {
            // FIXME:
            // if (isReservationUnfulfilled) {
            //   if (params["status"] === "Picked") {
            //     await markReservationPicked({ variables: { reservationNumber: data.reservationNumber } })
            //   } else if ((params["status"] = "Packed")) {
            //     await markReservationPacked({ variables: { reservationNumber: data.reservationNumber } })
            //   }
            // } else {
            //   const mutationData: ProcessReservationMutationVariables = {
            //     data: {
            //       reservationNumber: data.reservationNumber,
            //       productStates: Object.values(productStates).map((productState: any) =>
            //         omit(productState, "damageType")
            //       ) as ProductStateInput[],
            //       trackingNumber: params.trackingNumber,
            //     },
            //   }
            //   // Create PhysicalProductQualityEntry records
            //   const productStateArr = Object.values(productStates) as any[]
            //   for (let i = 0; i < productStateArr.length; i++) {
            //     const productState = productStateArr[i]
            //     const product = data.products?.[i]
            //     await submitQAEntry({
            //       variables: {
            //         notes: productState.notes,
            //         type: productState.damageType?.[0],
            //         damageTypes: productState.damageType,
            //         physicalProductID: product.id,
            //         userID: session.user.id,
            //         published: false,
            //       },
            //     })
            //   }
            //   await processReservation({ variables: mutationData })
            //   setIsMutating(false)
            // }
          } catch (e) {
            console.error(e)
            showSnackbar({
              message: `Error: ${e.message}`,
              status: "error",
            })
          }
        }}
      />
    </>
  )
}
