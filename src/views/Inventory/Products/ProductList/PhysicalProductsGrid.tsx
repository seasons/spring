import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box, Typography } from "@material-ui/core"
import { GetReservation_products } from "generated/GetReservation"
import { Image, Indicator } from "components"

export const PhysicalProductRow = ({ physicalProduct }) => {
  const { seasonsUID, productStatus, inventoryStatus } = physicalProduct

  return (
    <TableRow>
      <TableCell>{seasonsUID}</TableCell>
      <TableCell>{productStatus}</TableCell>
      <TableCell>{inventoryStatus}</TableCell>
    </TableRow>
  )
}

interface PhysicalProductsGridProps {
  physicalProducts: any[]
}

export const PhysicalProductsGrid: React.FC<PhysicalProductsGridProps> = ({ physicalProducts }) => {
  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Seasons UID</TableCell>
            <TableCell>Product status</TableCell>
            <TableCell>Inventory status</TableCell>
          </TableHead>
          <TableBody>
            {physicalProducts.map(product => (
              <PhysicalProductRow physicalProduct={product} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
