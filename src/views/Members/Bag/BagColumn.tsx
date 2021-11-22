import { Box, Typography, styled, Button } from "@material-ui/core"
import { Separator, Spacer } from "components"
import React from "react"
import { BagItemCard } from "./BagItemCard"

export const BagColumn = ({ bagSection, index, setShowModal, setModalBagItems }) => {
  const bagItems = bagSection.bagItems
  const trackingUrl = bagSection.deliveryTrackingUrl

  let buttons
  switch (bagSection.id) {
    case "queued":
      buttons = [
        {
          id: "pickItems",
          title: "Pick items",
          onClick: () => {
            setModalBagItems(bagItems)
            setShowModal("PickingModal")
          },
          disabled: false,
        },
      ]
      break
    case "picked":
      buttons = [
        {
          id: "packItems",
          title: "Pack items",
          onClick: () => {
            setModalBagItems(bagItems)
            setShowModal("PackingModal")
          },
          disabled: false,
        },
      ]
      break
    case "packed":
      buttons = [
        { id: "pickedUp", title: "Picked up", onClick: () => null, disabled: false },
        { id: "printlabel", title: "Print label", onClick: () => null, disabled: false },
      ]
      break
    case "outbound":
      buttons = [
        {
          id: "trackShippment",
          title: "Track shipment",
          onClick: () => window.open(trackingUrl, "_blank"),
          disabled: !trackingUrl,
        },
      ]
      break
    case "deliveredToCustomer":
      buttons = [{ id: "returnLabel", title: "Return label", onClick: () => null, disabled: false }]
      break
    case "inbound":
      buttons = [
        {
          id: "trackReturn",
          title: "Track return",
          onClick: () => window.open(trackingUrl, "_blank"),
          disabled: !trackingUrl,
        },
      ]
      break
    case "deliveredToBusiness":
      buttons = [
        {
          id: "process",
          title: "Process",
          onClick: () => {
            setModalBagItems(bagItems)
            setShowModal("ProcessReturnModal")
          },
          disabled: false,
        },
      ]
      break
  }

  return (
    <Wrapper mr={2} pl={index === 0 ? 2 : 0}>
      <FlexHeader>
        <Typography variant="h4">{bagSection.title}</Typography>
        <Flex>
          {buttons?.map((button, index) => {
            const { onClick } = button
            return (
              <Box key={index} ml={1}>
                <Button variant="contained" onClick={onClick} disabled={!bagItems?.length || button.disabled}>
                  {button.title}
                </Button>
              </Box>
            )
          })}
        </Flex>
      </FlexHeader>
      <Spacer mb={1} />
      <Separator />
      <Spacer mb={2} />
      <Box>
        {bagItems?.map((bagItem, index) => {
          return <BagItemCard bagItem={bagItem} key={index} columnId={bagSection.id} />
        })}
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  width: "343px",
  flex: "none",
})

const Flex = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
})

const FlexHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  height: "36px",
})
