import React, { useEffect, useState } from "react"

import { BagColumns } from "./BagColumns"
import { PickingPackingModal } from "./Modals/PickingPackingModal/PickingPackingModal"
import { ProcessReturnModal } from "./Modals/ProcessReturnModal/ProcessReturnModal"
import { PickupModal } from "./Modals/PickupModal/PickupModal"
import { PrintLabelsModal } from "./Modals/PrintLabelsModal/PrintLabelsModal"
import { CancelItemsModal } from "./Modals/CancelItemsModal/CancelItemsModal"
import { PlaceReservationModal } from "./Modals/PlaceReservationModal/PlaceReservationModal"

export enum ModalType {
  PlaceReservation = "PlaceReservationModal",
  ProcessReturn = "ProcessReturnModal",
  Picking = "PickingModal",
  Packing = "PackingModal",
  Pickup = "PickupModal",
  PrintLabels = "PrintLabelsModal",
  CancelItems = "CancelItems",
}

export const BagView = ({ customer, refetch }) => {
  const [showModal, setShowModal] = useState<ModalType | null>(null)
  const [data, setData] = useState([])

  const bagSections = customer?.bagSections

  let Modal: JSX.Element = <></>

  const onClose = () => setShowModal(null)

  switch (showModal) {
    case ModalType.PlaceReservation:
      Modal = (
        <PlaceReservationModal open={showModal === ModalType.PlaceReservation} onClose={onClose} customer={customer} />
      )
      break
    case ModalType.ProcessReturn:
      Modal = (
        <ProcessReturnModal
          open={showModal === ModalType.ProcessReturn}
          onClose={() => setShowModal(null)}
          customerId={customer.id}
          bagSections={bagSections}
        />
      )
      break
    case ModalType.Packing:
    case ModalType.Picking:
      Modal = (
        <PickingPackingModal
          open
          mode={showModal === "PickingModal" ? "Pick" : "Pack"}
          onClose={onClose}
          bagItems={data}
        />
      )
      break
    case ModalType.PrintLabels:
      Modal = <PrintLabelsModal data={data} open onClose={onClose} refetch={refetch} />
      break
    case ModalType.Pickup:
      Modal = <PickupModal open onClose={onClose} bagItems={data} />
      break
    case ModalType.CancelItems:
      Modal = <CancelItemsModal open bagItems={data} onClose={onClose} />
      break
  }

  return (
    <>
      <BagColumns customer={customer} bagSections={bagSections} setData={setData} setShowModal={setShowModal} />
      {Modal}
    </>
  )
}
