import React, { useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, Typography } from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
import { GetReservation } from "generated/GetReservation"
import { SelectProductCard } from "../../SelectProductCard"

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
  const returnedProducts = reservation?.returnedProducts.map(a => a.id)
  const products = reservation?.products?.filter(a => !returnedProducts?.includes(a?.id))
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
      <DialogContent dividers>
        {products.length > 0 ? (
          <Box>
            <Box pb={2} pl={0.5} display="flex" justifyContent="center">
              <Typography variant="h5" style={{ textDecoration: "underline" }}>
                Items selected will be returned early
              </Typography>
            </Box>
            {products.map((product, index) => {
              return (
                <Box key={index}>
                  <SelectProductCard
                    product={product}
                    setSelectedProductsIDs={setSelectedProductsIDs}
                    selectedProductsIDs={selectedProductsIDs}
                  />
                  <Spacer mb={2} />
                </Box>
              )
            })}
          </Box>
        ) : (
          <Typography variant="body1">No items to return</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave} color="primary" variant="contained" disabled={!shouldAllowSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
