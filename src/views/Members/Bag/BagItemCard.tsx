import React, { useState } from "react"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import { truncate } from "lodash"
import CardMedia from "@material-ui/core/CardMedia"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { Box, Typography, Button } from "@material-ui/core"
import { SwapButton } from "./SwapButton"
import { Link as RouterLink, useHistory } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
import { colors } from "theme/colors"

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

export const BagItemCard = ({ bagItem, index }) => {
  const classes = useStyles()
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useHistory()
  const variant = bagItem?.productVariant
  const product = variant?.product
  const physicalProduct = bagItem?.physicalProduct
  const image = product?.images?.[0]
  const isSwappable = bagItem?.isSwappable
  const onCloseConfirmationDialog = async (agreed: boolean, type: "Return") => {
    // Make sure user has confirmed submission
    if (!agreed || isSubmitting) {
      return
    }
    setIsSubmitting(false)
  }

  const physicalProductId = bagItem?.physicalProduct?.id

  const linkUrl = !!physicalProductId
    ? `/inventory/product/variant/physicalProduct/${physicalProductId}/manage`
    : `/inventory/product/variants/${variant?.id}`

  // FIXME: Remove uniqueID once proper bagitems are passed and use bagItem.id
  return (
    <Draggable draggableId={bagItem.uniqueID} index={index}>
      {provided => {
        return (
          <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Card className={classes.root}>
              <ContentWrapper>
                <CardMedia className={classes.media} image={image?.url ?? ""} />
                <TextWrapper pl={2}>
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
                  <StatusWrapper>
                    <Typography style={{ textDecoration: "underline" }}>{bagItem?.status}</Typography>
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
          </Box>
        )
      }}
    </Draggable>
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
