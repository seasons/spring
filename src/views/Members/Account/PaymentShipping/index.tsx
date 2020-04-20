import { EditButton } from "components"
import React from "react"

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
}))

export const PaymentShipping: React.FC = props => {
  const classes = useStyles()

  const handleEditPayment = () => {
    console.log("editing payment")
  }

  const handleEditBillingAddress = () => {
    console.log("editing billing address")
  }

  const handleEditShippingAddress = () => {
    console.log("editing shipping address")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Payment & Shipping" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Payment</TableCell>
              <TableCell>VISA ending 0909</TableCell>
              <TableCell>
                <EditButton onClick={handleEditPayment} />
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Billing address</TableCell>
              <TableCell>
                <Typography component="p">Luc Succes,</Typography>
                <Typography component="p">1 John St, Apt G6</Typography>
                <Typography component="p">Brooklyn, NY</Typography>
                <Typography component="p">11217</Typography>
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditBillingAddress} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping address</TableCell>
              <TableCell>
                <Typography component="p">Luc Succes,</Typography>
                <Typography component="p">138 Mulberry St,</Typography>
                <Typography component="p">New York, NY</Typography>
                <Typography component="p">10013</Typography>
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditShippingAddress} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
