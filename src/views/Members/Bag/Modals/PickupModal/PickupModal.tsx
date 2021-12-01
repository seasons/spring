import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"

import { Button, Dialog, DialogContent, DialogActions, Box } from "@material-ui/core"
import { DialogTitle } from "components"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { BagItemCard } from "./BagItemCard"

export const MARKED_PICKED_UP = gql`
  mutation MarkAsPickedUp($bagItemIds: [ID]!) {
    markAsPickedUp(bagItemIds: $bagItemIds)
  }
`

interface PickupModal {
  open: boolean
  onClose?: () => void
  bagItems: any
}

export const PickupModal: React.FC<PickupModal> = ({ open, onClose, bagItems }) => {
  const [selectedBagItems, setSelectedBagItems] = useState<string[]>([])
  const refresh = useRefresh()
  const [markPickedUp] = useMutation(MARKED_PICKED_UP, {
    onCompleted: () => {
      refresh()
    },
  })

  const handleSave = () => {
    markPickedUp({
      variables: {
        bagItemIds: selectedBagItems,
      },
    })
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Marked picked up by customer
        </DialogTitle>
        <DialogContent dividers>
          <Box mt={2} mb={2}>
            {bagItems.map(bagItem => {
              return (
                <Box mb={2} key={bagItem.id}>
                  <BagItemCard
                    selectedBagItems={selectedBagItems}
                    bagItem={bagItem}
                    onClick={bagItem => {
                      if (selectedBagItems?.includes(bagItem.id)) {
                        setSelectedBagItems(selectedBagItems.filter(id => id !== bagItem.id))
                      } else {
                        setSelectedBagItems([...selectedBagItems, bagItem.id])
                      }
                    }}
                  />
                </Box>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleSave()} color="primary" variant="contained">
            Mark as picked up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
