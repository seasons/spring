import React, { useState } from "react"
import { Button, Typography } from "@material-ui/core"
import { SwapBagItemModal } from "../SwapBagItemModal"

interface SwapButtonProps {
  bagItem: any
  customer: any
}

export const SwapButton: React.FunctionComponent<SwapButtonProps> = ({ bagItem, customer }) => {
  const [showSwapBagItemModal, setShowSwapBagItemModal] = useState(false)

  const openSwapBagItemModal = () => setShowSwapBagItemModal(true)

  return (
    <>
      <Button variant="contained" color="primary" onClick={openSwapBagItemModal}>
        <Typography>Swap</Typography>
      </Button>
      <SwapBagItemModal
        onClose={() => setShowSwapBagItemModal(false)}
        open={showSwapBagItemModal}
        customer={customer}
        bagItem={bagItem}
      />
    </>
  )
}
