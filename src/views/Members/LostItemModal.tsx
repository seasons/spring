import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, Typography } from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
// import { SelectProductCard } from "../../SelectProductCard"
import { Alert } from "@material-ui/lab"
import { gql } from "apollo-boost"
import { SelectBagItemCard } from "./SelectBagItemCard"

const PROCESS_LOST_ITEMS = gql`
  mutation processLostItems($lostBagItemIds: [String]) {
    processLostItems(lostBagItemIds: $lostBagItemsIds)
  }
`

interface LostItemModalProps {
  open: boolean
  onClose: () => void
  bagItems: any
}

export const LostItemModal: React.FC<LostItemModalProps> = ({ open, onClose, bagItems }) => {
  const [potentialLostItems, setPotentialLostItems] = useState<any>([])
  const [selectedBagItems, setSelectedBagItems] = useState<any>([])
  const shouldAllowSave = selectedBagItems.length > 0
  const handleSave = () => {
    // return onSave(reservationID, selectedProductsIDs)
  }

  const handleSelect = (selected, bagItemId) => {
    if (selected) {
      setSelectedBagItems([...selectedBagItems, bagItemId])
    } else {
      setSelectedBagItems(selectedBagItems.filter(a => a !== bagItemId))
    }
  }

  useEffect(() => {
    if (bagItems) {
      const filteredBagItems = bagItems.filter(
        a =>
          a.reservationPhysicalProduct.status === "BusinessToCustomer" ||
          a.reservationPhysicalProduct.status === "CustomerToBusiness"
      )
      setPotentialLostItems(bagItems)
      setSelectedBagItems(bagItems)
    }
  }, [bagItems])

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Lost Items
      </DialogTitle>
      <DialogContent dividers>
        {potentialLostItems.length > 0 ? (
          <Box>
            <Alert severity="info" style={{ flex: 1 }}>
              Items selected will be marked as lost
            </Alert>
            {potentialLostItems.map((bagItem, index) => {
              return (
                <SelectBagItemCard
                  bagItem={bagItem}
                  isSelected={selectedBagItems.includes(bagItem.id)}
                  onSelect={handleSelect}
                />
              )
            })}
          </Box>
        ) : (
          <Typography variant="body1">No items to mark as lost</Typography>
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
