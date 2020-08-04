import React from "react"
import { Box, Grid, IconButton, Menu, MenuItem, styled } from "@material-ui/core"
import { CheckField } from "fields"
import { colors } from "theme"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

const BorderedIconButton = styled(IconButton)({
  border: `1px solid ${colors.grey[300]}`,
  padding: "5px",
})

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
  setUpdatingStatusForPhysicalProduct: (physicalProduct: any) => void
  setOffloadingPhysicalProduct: (PhysicalProduct: any) => void
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({
  id,
  record,
  resource,
  setUpdatingStatusForPhysicalProduct,
  setOffloadingPhysicalProduct,
}) => {
  const { seasonsUID, productStatus, inventoryStatus, barcode, warehouseLocation } = record

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
      action: () => setUpdatingStatusForPhysicalProduct(record),
    },
    {
      text: "Offload",
      action: () => setOffloadingPhysicalProduct(record),
    },
  ]

  return (
    <Box my={2}>
      <Grid container spacing={3}>
        <Box>{seasonsUID}</Box>
        <Box>{productStatus}</Box>
        <Box>{inventoryStatus}</Box>
        <Box>
          <CheckField record={record} source="barcoded" value={true} />
        </Box>
        <Box>{barcode}</Box>
        <Box>{warehouseLocation?.barcode || "None"}</Box>
        <Box>
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
        </Box>
      </Grid>
    </Box>
  )
}
