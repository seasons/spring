import React, { useState } from "react"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import { truncate } from "lodash"
import { Menu, MenuItem } from "@material-ui/core"
import CardMedia from "@material-ui/core/CardMedia"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { Box, Typography, Button, IconButton } from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import { useHistory } from "react-router-dom"
import { SwapBagItemModal } from "../SwapBagItemModal"

const useStyles = makeStyles(theme => ({
  root: {
    padding: "16px",
    maxWidth: 345,
    marginBottom: "8px",
    borderRadius: "8px",
  },
  media: {
    borderRadius: "8px",
    width: "108px",
    height: "136px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
}))

interface MenuItem {
  text: string
  action: () => void
}

export const BagItemCard = ({ bagItem, index, columnId }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSwapItemModalOpen, setIsSwapItemModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useHistory()
  const variant = bagItem?.productVariant
  const product = variant?.product
  const physicalProduct = bagItem?.physicalProduct
  const image = product?.images?.[0]

  const onCloseConfirmationDialog = async (agreed: boolean, type: "Return") => {
    // Make sure user has confirmed submission
    if (!agreed || isSubmitting) {
      return
    }
    setIsSubmitting(false)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenSwapModal = () => {
    setIsSwapItemModalOpen(true)
  }

  const handleCloseSwapModal = () => {
    setIsSwapItemModalOpen(false)
  }

  const physicalProductId = bagItem?.physicalProduct?.id

  const linkUrl = !!physicalProductId
    ? `/inventory/product/variant/physicalProduct/${physicalProductId}/manage`
    : `/inventory/product/variants/${variant?.id}`

  let MetaData
  let menuItems: MenuItem[] = []

  switch (columnId) {
    case "queued":
      menuItems = [
        { text: "Hold item", action: () => null },
        { text: "Mark as lost", action: () => null },
        { text: "Swap Item", action: () => handleOpenSwapModal() },
      ]
      MetaData = () => <Typography>{bagItem?.physicalProduct?.barcode}</Typography>
      break
    case "picked":
      menuItems = [{ text: "Swap Item", action: () => handleOpenSwapModal() }]
    case "packed":
      MetaData = () => <Typography style={{ textDecoration: "underline" }}>{bagItem?.status}</Typography>
      break
    case "atHome":
      const physicalProductPrice = bagItem?.physicalProduct?.price
      const productVariantPrice = bagItem?.productVariant?.price
      let priceInDollars
      if (physicalProductPrice?.buyUsedEnabled && physicalProductPrice?.buyUsedPrice) {
        priceInDollars = physicalProductPrice?.buyUsedPrice / 100
      } else if (productVariantPrice?.buyNewEnabled && productVariantPrice?.buyNewPrice) {
        priceInDollars = productVariantPrice?.buyNewPrice / 100
      }

      const price = priceInDollars?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      if (price) {
        MetaData = () => <Typography>{price}</Typography>
      } else {
        MetaData = () => <Box />
      }

      break
    case "shipped":
    case "returnLabel":
    case "returnPending":
    case "customerToBusiness":
    default:
      MetaData = () => <Box />
      break
  }

  // FIXME: Remove uniqueID once proper bagitems are passed and use bagItem.id
  return (
    <Box>
      <Card className={classes.root}>
        <ContentWrapper>
          <CardMedia className={classes.media} image={image?.url ?? ""} />
          <TextWrapper pl={2}>
            <FlexWrapper>
              <Box>
                <Typography>{product?.brand?.name}</Typography>
                <Typography color="secondary">
                  {truncate(product?.name, {
                    length: 22,
                    omission: "...",
                  })}
                </Typography>
                <Typography color="secondary">{physicalProduct?.seasonsUID}</Typography>
              </Box>
              {menuItems.length > 0 && (
                <BorderedIconButton onClick={handleOpenMenu} size="small">
                  <MoreHorizIcon />
                </BorderedIconButton>
              )}
            </FlexWrapper>
            <Menu
              id={`simple-menu-${bagItem.id}`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {menuItems.map((item, i) => (
                <MenuItem
                  key={`menuitem-${item.text + i}`}
                  onClick={() => {
                    handleCloseMenu()
                    item?.action?.()
                  }}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
            <StatusWrapper>
              <MetaData />
              <Button color="primary" variant="contained" onClick={() => router.push(linkUrl)}>
                View
              </Button>
            </StatusWrapper>
          </TextWrapper>
        </ContentWrapper>
      </Card>
      <ConfirmationDialog
        title="Return Item"
        body="Are you sure you want to mark this item as returned?"
        open={isReturnConfirmationDialogOpen}
        setOpen={setIsReturnConfirmationDialogOpen}
        onClose={agreed => onCloseConfirmationDialog(agreed, "Return")}
      />
      <SwapBagItemModal
        open={isSwapItemModalOpen}
        onClose={() => handleCloseSwapModal()}
        bagItem={bagItem}
        customer={bagItem.customer}
      />
    </Box>
  )
}

const StatusWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "baseline",
  justifyContent: "space-between",
})

const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
})

const TextWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  justifyContent: "space-between",
})

const FlexWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
})

const BorderedIconButton = styled(IconButton)({
  paddingLeft: "5px",
  transform: "rotate(90deg)",
})
