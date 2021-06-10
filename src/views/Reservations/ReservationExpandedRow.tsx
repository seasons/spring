import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box } from "@material-ui/core"
import { Image } from "components/Image"
import { SinceDateField } from "fields"

interface ReservationExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

export const ReservationExpandedRow = ({ record: reservation }: ReservationExpandedRowProps) => {
  const returnedItemImages = reservation?.returnedProducts?.map(p => p.productVariant?.product?.images?.[0])

  return (
    <Box p={1}>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Marked as returned</TableCell>
              <TableCell>Returned Items</TableCell>
              <TableCell>Expected Return date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <SinceDateField record={reservation} source="returnedAt" />
              </TableCell>
              <TableCell>
                <Box display="flex" flexDirection="row">
                  {returnedItemImages.map(image => {
                    const { url } = image
                    return <Image key={url} url={url} size="small" />
                  })}
                </Box>
              </TableCell>
              <TableCell>
                <SinceDateField record={reservation} source="returnAt" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
