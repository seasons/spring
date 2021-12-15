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
import { Spacer } from "components"
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
      <Dialog onClose={onClose} open={open} maxWidth={"xl"}>
        <DialogTitle>
          <Typography variant={"h3"}>{mode} line items</Typography>
        </DialogTitle>

        <DialogContent dividers>
          {lineItems && (
            <Table>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rental start at</TableCell>
                <TableCell>Days rented</TableCell>
                <TableCell>Rental ended at</TableCell>
              </TableHead>
              <TableBody>
                {lineItems.map(a => {
                  return (
                    <TableRow>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{formatPrice(a.price)}</TableCell>
                      <TableCell>{moment(a?.rentalStartedAt).format("LLL")}</TableCell>
                      <TableCell>{a.daysRented}</TableCell>
                      <TableCell>{moment(a?.rentalEndedAt).format("LLL")}</TableCell>
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
