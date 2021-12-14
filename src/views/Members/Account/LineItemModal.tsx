import {
  Button,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableRow,
} from "@material-ui/core"
import moment from "moment"
import React from "react"
import { formatPrice } from "utils/price"

interface LineItemModalProps {
  open: boolean
  onClose?: () => void
  mode: string | null
  lineItems: any
}

export const LineItemModal: React.FC<LineItemModalProps> = ({ open, onClose, mode, lineItems }) => {
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle id="customized-dialog-title" aria-labelledby="customized-dialog-title">
          {mode} line items
        </DialogTitle>
        <DialogContent dividers>
          {lineItems && (
            <Table>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rental start at</TableCell>
                <TableCell>Days rented</TableCell>
              </TableHead>
              <TableBody>
                {lineItems.map(a => {
                  const name = a.name

                  return (
                    <TableRow>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{formatPrice(a.price)}</TableCell>
                      <TableCell>{moment(a?.rentalStartAt).format("LLL")}</TableCell>
                      <TableCell>{a.daysRented}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <CardActions>
          <Button onClick={onClose}>Close</Button>
        </CardActions>
      </Dialog>
    </>
  )
}
