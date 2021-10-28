import React from "react"
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Card,
  Box,
  Menu,
  IconButton,
  MenuItem,
  styled,
} from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import { LinearProgress } from "components"

import { CheckField } from "fields"
import { colors } from "theme"

export const PhysicalProductRow = ({
  physicalProduct,
  setUpdatingStatusForPhysicalProduct,
  setOffloadingPhysicalProduct,
}) => {
  const {
    recoupmentPercentage,
    seasonsUID,
    productStatus,
    inventoryStatus,
    barcode,
    warehouseLocation,
  } = physicalProduct

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    {
      text: "Update status",
      action: () => setUpdatingStatusForPhysicalProduct(physicalProduct),
    },
    {
      text: "Offload",
      action: () => setOffloadingPhysicalProduct(physicalProduct),
    },
  ]

  return (
    <TableRow>
      <TableCell>{seasonsUID}</TableCell>
      <TableCell>{productStatus}</TableCell>
      <TableCell>
        <LinearProgress value={recoupmentPercentage} variant="determinate" />
      </TableCell>
      <TableCell>{inventoryStatus}</TableCell>
      <TableCell>
        <CheckField record={physicalProduct} source="barcoded" value={true} />
      </TableCell>
      <TableCell>{barcode}</TableCell>
      <TableCell>{warehouseLocation?.barcode || "None"}</TableCell>
      <TableCell>
        <Box>
          <BorderedIconButton onClick={handleClick} size="small">
            <MoreHorizIcon />
          </BorderedIconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {menuItems.map((item, i) => (
              <MenuItem
                key={`menuitem-${item.text + i}`}
                onClick={() => {
                  handleClose()
                  item?.action?.()
                }}
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  )
}

const BorderedIconButton = styled(IconButton)({
  border: `1px solid ${colors.grey[300]}`,
  padding: "5px",
})

interface PhysicalProductsGridProps {
  physicalProducts: any[]
  setUpdatingStatusForPhysicalProduct: (physicalProduct: any) => void
  setOffloadingPhysicalProduct: (physicalProduct: any) => void
}

export const PhysicalProductsGrid: React.FC<PhysicalProductsGridProps> = ({
  physicalProducts,
  setUpdatingStatusForPhysicalProduct,
  setOffloadingPhysicalProduct,
}) => {
  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Seasons UID</TableCell>
            <TableCell>Product status</TableCell>
            <TableCell>Recoupment</TableCell>
            <TableCell>Inventory status</TableCell>
            <TableCell>Barcoded</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {physicalProducts.map(product => (
              <PhysicalProductRow
                physicalProduct={product}
                setUpdatingStatusForPhysicalProduct={setUpdatingStatusForPhysicalProduct}
                setOffloadingPhysicalProduct={setOffloadingPhysicalProduct}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
