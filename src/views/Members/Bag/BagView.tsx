import { useSnackbarContext } from "components/Snackbar"
import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { BagColumns } from "./BagColumns"
import { PickingPackingModal } from "./Modals/PickingPackingModal/PickingPackingModal"
import { MultiItemReturnModal } from "../MultiItemReturn"
import { PickupModal } from "./Modals/PickupModal/PickupModal"

enum Modals {
  ProcessReturnModal = "ProcessReturnModal",
  PickingModal = "PickingModal",
  PackingModal = "PackingModal",
  PickupModal = "PickupModal",
}

export const BagView = ({ customer }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [showModal, setShowModal] = useState<Modals | null>(null)
  const [modalBagItems, setModalBagItems] = useState([])
  const { showSnackbar } = useSnackbarContext()
  const refresh = useRefresh()

  const bagSections = customer?.bagSections

  return (
    <>
      <BagColumns bagSections={bagSections} setModalBagItems={setModalBagItems} setShowModal={setShowModal} />
      <PickupModal open={showModal === "PickupModal"} onClose={() => setShowModal(null)} bagItems={modalBagItems} />
      <MultiItemReturnModal
        open={showModal === "ProcessReturnModal"}
        onClose={() => setShowModal(null)}
        customerId={customer.id}
      />
      <PickingPackingModal
        open={showModal === "PickingModal" || showModal === "PackingModal"}
        mode={showModal === "PickingModal" ? "Pick" : "Pack"}
        onClose={() => setShowModal(null)}
        onSave={async bagItems => {
          setIsMutating(false)
          setShowModal(null)
          showSnackbar({
            message: `Items successfully ${showModal === "PickingModal" ? "picked" : "packed"}`,
            status: "success",
          })
          refresh()
        }}
        bagItems={modalBagItems}
      />
    </>
  )
}
