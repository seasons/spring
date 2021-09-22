import React, { useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box } from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
import { GetReservation } from "generated/GetReservation"
import { EarlyReturnProductCard } from "./EarlyReturnProductCard"

interface EarlyReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?: any
  disableButton?: boolean
  reservation: GetReservation
}

export const EarlyReturnModal: React.FC<EarlyReturnModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
  reservation,
}) => {
  const products = reservation?.products
  const [selectedProductsIDs, setSelectedProductsIDs] = useState<any>([])
  const shouldAllowSave = selectedProductsIDs.length > 0
  const reservationID = reservation?.id

  const handleSave = () => {
    return onSave(reservationID, selectedProductsIDs)
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Early Return
      </DialogTitle>
      <DialogContent dividers>Choose which products are going to be returned early</DialogContent>
      {!!products &&
        products.map((product, index) => {
          return (
            <Box key={index}>
              <EarlyReturnProductCard
                product={product}
                setSelectedProductsIDs={setSelectedProductsIDs}
                selectedProductsIDs={selectedProductsIDs}
              />
              <Spacer mb={1} />
            </Box>
          )
        })}
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={!shouldAllowSave || disableButton}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
