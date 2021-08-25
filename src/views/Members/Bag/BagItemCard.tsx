import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { red } from "@material-ui/core/colors"
import DeleteIcon from "@material-ui/icons/Delete"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation } from "react-apollo"
import { gql } from "apollo-boost"
import { Box, Typography } from "@material-ui/core"
import { SwapButton } from "./SwapButton"

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
  const refresh = useRefresh()
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={
            <Box>
              <Typography>{brand.name}</Typography>
            </Box>
          }
          action={
            <Box>
              <IconButton
                aria-label="return"
                onClick={() => {
                  setIsReturnConfirmationDialogOpen(true)
                }}
              >
                <ArchiveIcon />
              </IconButton>
              {isSwappable && <SwapButton bagItem={bagItem} customer={member} />}
            </Box>
          }
        />
        <CardMedia className={classes.media} image={image.url} />
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
