import React, { useState } from "react"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import { useMutation } from "react-apollo"
import { truncate } from "lodash"
import { Menu, MenuItem } from "@material-ui/core"
import CardMedia from "@material-ui/core/CardMedia"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { Box, Typography, Button, IconButton } from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import gql from "graphql-tag"
import { useRefresh } from "@seasons/react-admin"
import { SwapBagItemModal } from "../SwapBagItemModal"

const useStyles = makeStyles(theme => ({
  root: {
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

export const UPDATE_RESERVATION_PHYSICAL_PRODUCT = gql`
  mutation UpdateReservationPhysicalProduct(
    $where: ReservationPhysicalProductWhereUniqueInput!
    $data: ReservationPhysicalProductUpdateInput!
  ) {
    updateReservationPhysicalProduct(where: $where, data: $data) {
      id
    }
  }
`

const MARK_NOT_RETURNED = gql`
  mutation MarkNotReturned($rppId: ID!) {
    markNotReturned(rppId: $rppId) {
      id
    }
  }
`

const MARK_AS_FOUND = gql`
  mutation MarkAsFound($rppId: ID!, $status: String!) {
    markAsFound(rppId: $rppId, status: $status)
  }
`

const MARK_AS_LOST = gql`
  mutation MarkAsLost($lostBagItemId: ID!) {
    markAsLost(lostBagItemId: $lostBagItemId)
  }
`

export const BagItemCard = ({ bagItem, columnId }) => {
  const classes = useStyles()
  const refresh = useRefresh()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSwapItemModalOpen, setIsSwapItemModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const variant = bagItem?.productVariant
  const product = variant?.product
  const physicalProduct = bagItem?.physicalProduct
  const image = product?.images?.[0]
  const reservationPhysicalProduct = bagItem?.reservationPhysicalProduct
  const isOnHold = reservationPhysicalProduct?.isOnHold

  const [markAsFound] = useMutation(MARK_AS_FOUND, {
    onCompleted: data => {
      refresh()
    },
    onError: error => {
      console.log(error)
    },
  })

  const [markNotReturned] = useMutation(MARK_NOT_RETURNED, {
    onCompleted: data => {
      refresh()
    },
    onError: error => {
      console.log(error)
    },
  })

  const [markAsLost] = useMutation(MARK_AS_LOST, {
    onCompleted: data => {
      refresh()
    },
    onError: error => {
      console.log(error)
    },
  })

  const [updateReservationPhysicalProduct] = useMutation(UPDATE_RESERVATION_PHYSICAL_PRODUCT, {
    onCompleted: data => {
      refresh()
    },
    onError: error => {
      console.log(error)
    },
  })

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

  const onUpdateReservationPhysicalProduct = data => {
    updateReservationPhysicalProduct({
      variables: {
        where: { id: reservationPhysicalProduct.id },
        data,
      },
    })
  }

  const onMarkIsFound = () => {
    markAsFound({
      variables: {
        rppId: reservationPhysicalProduct.id,
        status:
          reservationPhysicalProduct.lostInPhase === "CustomerToBusiness"
            ? "DeliveredToBusiness"
            : "DeliveredToCustomer",
      },
    })
  }

  const onMarkAsLost = () => {
    markAsLost({
      variables: {
        lostBagItemId: bagItem.id,
      },
    })
  }

  const handleMarkNotReturned = () => {
    markNotReturned({
      variables: {
        rppId: reservationPhysicalProduct.id,
      },
    })
  }

  const physicalProductId = bagItem?.physicalProduct?.id

  const linkUrl = !!physicalProductId
    ? `/inventory/product/variant/physicalProduct/${physicalProductId}/manage`
    : `/inventory/product/variants/${variant?.id}`

  let MetaData = () => <Box />
  let menuItems: MenuItem[] = []

  switch (columnId) {
    case "queued":
    case "picked":
    case "packed":
      menuItems = [
        {
          text: isOnHold ? "Release hold" : "Hold item",
          action: () =>
            onUpdateReservationPhysicalProduct({
              isOnHold: !isOnHold,
            }),
        },
        { text: "Swap Item", action: () => handleOpenSwapModal() },
      ]
      MetaData = () => <Typography>{bagItem?.physicalProduct?.barcode}</Typography>
      break
    case "deliveredToCustomer":
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
      }
      menuItems = [{ text: "Mark as lost", action: () => onMarkAsLost() }]
      break
    case "shipped":
    case "customerToBusiness":
      menuItems = [{ text: "Mark as lost", action: () => onMarkAsLost() }]
      break
    case "lost":
      // FIXME: Implement mark as found
      const lostInPhaseDisplay =
        reservationPhysicalProduct?.lostInPhase &&
        (reservationPhysicalProduct?.lostInPhase === "BusinessToCustomer" ? "Lost outbound" : "Lost inbound")
      if (lostInPhaseDisplay) {
        MetaData = () => <Typography>{lostInPhaseDisplay}</Typography>
      }
      menuItems = [{ text: "Mark as found", action: () => onMarkIsFound() }]
      break
    case "deliveredToBusiness":
      menuItems = [
        {
          text: "Mark not returned",
          action: () => handleMarkNotReturned(),
        },
      ]
      break
    case "returnPending":
      menuItems = [{ text: "Mark as lost", action: () => onMarkAsLost() }]
      break
    default:
      break
  }

  const redBackgroundColor = "#C84347"

  return (
    <Box width="345px">
      <Card className={classes.root} style={{ border: isOnHold ? `1px solid ${redBackgroundColor}` : "none" }}>
        {isOnHold && (
          <Box px={2} py={1} style={{ backgroundColor: redBackgroundColor }}>
            <Typography color="primary">On Hold</Typography>
          </Box>
        )}
        <ContentWrapper px={2} py={2}>
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
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  window.open(linkUrl, "_blank")
                }}
              >
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
  width: "313px",
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
  alignItems: "flex-start",
  width: "100%",
  justifyContent: "space-between",
})

const BorderedIconButton = styled(IconButton)({
  paddingLeft: "5px",
  transform: "rotate(90deg)",
})
