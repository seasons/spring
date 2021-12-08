import React, { useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Typography, Card } from "@material-ui/core"
import { DialogTitle } from "components"
import { BagItemCard } from "../PickupModal/BagItemCard"
import { ConfirmationModal } from "../ConfirmationModal"
import { MARK_AS_CANCELLED } from "views/Reservations/mutations"
import { useMutation } from "@apollo/react-hooks"
import { useSnackbarContext } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"

interface CancelItemsModalProps {
  open: boolean
  onClose?: () => void
  bagItems: any
}

export const CancelItemsModal: React.FC<CancelItemsModalProps> = ({ open, onClose, bagItems }) => {
  const { showSnackbar } = useSnackbarContext()
  const refresh = useRefresh()
  const [markAsCancelled] = useMutation(MARK_AS_CANCELLED, {
    onCompleted: result => {
      showSnackbar({
        message: "Items Cancelled",
        status: "success",
      })
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: error.message,
        status: "error",
      })
    },
  })
  const [selectedBagItems, setSelectedBagItems] = useState<any>([])
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

  const shouldAllowSave = selectedBagItems.length > 0

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Cancel Items
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
          <Button
            autoFocus
            onClick={() => {
              setOpenConfirmationModal(true)
            }}
            color="primary"
            variant="contained"
            disabled={!shouldAllowSave}
          >
            Cancel Items
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        handleMutation={() => {
          markAsCancelled({
            variables: {
              bagItemIds: selectedBagItems,
            },
          })
        }}
        mutationName={"cancelled"}
      />
    </>
  )
}
