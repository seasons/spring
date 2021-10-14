import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { red } from "@material-ui/core/colors"
import { Box, Typography, Button } from "@material-ui/core"
import { SwapButton } from "./SwapButton"
import { Link } from "@material-ui/core"
import { Link as RouterLink, useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "125%",
    width: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

export const BagItemCard = props => {
  const classes = useStyles()
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useHistory()
  const { bagItem } = props
  const { product } = bagItem.productVariant
  const { name, brand } = product
  const image = product.images?.[0]
  const { member } = props
  const isSwappable = bagItem?.isSwappable
  const onCloseConfirmationDialog = async (agreed: boolean, type: "Return") => {
    // Make sure user has confirmed submission
    if (!agreed || isSubmitting) {
      return
    }
    setIsSubmitting(false)
  }

  const physicalProductId = bagItem?.physicalProduct?.id
  console.log("physicalProductId", physicalProductId)

  const linkUrl = !!physicalProductId
    ? `/inventory/product/variant/physicalProduct/${physicalProductId}/manage`
    : `/inventory/product/variants/${bagItem.productVariant.id}`

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={
            <Link
              component={RouterLink}
              to={linkUrl}
              variant="body1"
              color="primary"
              onClick={e => e.stopPropagation()}
              style={{ color: "black" }}
            >
              <Box>
                <Typography>{name}</Typography>
              </Box>
            </Link>
          }
          subheader={
            <Box>
              <Typography>{brand.name}</Typography>
              <Typography>{bagItem.productVariant.displayShort}</Typography>
            </Box>
          }
          action={<Box>{isSwappable && <SwapButton bagItem={bagItem} customer={member} />}</Box>}
        />

        <Link
          component={RouterLink}
          to={linkUrl}
          variant="body1"
          color="primary"
          onClick={e => e.stopPropagation()}
          style={{ color: "black" }}
        >
          <CardMedia className={classes.media} image={image.url} />
        </Link>
        <Box padding="10px 16px">
          <FlexBox>
            <Typography>{bagItem?.status}</Typography>
          </FlexBox>
        </Box>
      </Card>
      <ConfirmationDialog
        title="Return Item"
        body="Are you sure you want to mark this item as returned?"
        open={isReturnConfirmationDialogOpen}
        setOpen={setIsReturnConfirmationDialogOpen}
        onClose={agreed => onCloseConfirmationDialog(agreed, "Return")}
      />
    </>
  )
}

const FlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
})
