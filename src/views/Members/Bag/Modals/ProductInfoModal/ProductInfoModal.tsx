import React, { useState } from "react"
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { DialogTitle } from "components"
import { Alert } from "@material-ui/lab"

interface ProductInfoModalProps {
  open: boolean
  onClose?: () => void
  bagItem: any
}

export const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ bagItem, onClose, open }) => {
  const { reservationPhysicalProduct } = bagItem
  const { status, isOnHold, hasBeenLost, lostAt, lostInPhase } = reservationPhysicalProduct
  const [warningMessage, setWarningMessage] = useState("")

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Product Info
      </DialogTitle>
      <DialogContent dividers>
        <Box mt={2} mb={2}>
          <Card>
            {!!warningMessage && <Alert severity="warning">{warningMessage}</Alert>}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>What</TableCell>
                  <TableCell>When</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Lost</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary" variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
