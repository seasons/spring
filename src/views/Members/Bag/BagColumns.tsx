import { Box, Button, styled } from "@material-ui/core"
import React from "react"
import { colors } from "theme/colors"
import { BagColumn } from "./BagColumn"

export const BagColumns = ({ customer, bagSections, setData, setShowModal }) => {
  const cancellableBagItems = bagSections
    .filter(a => ["Queued", "Picked", "Packed"].includes(a.title))
    .reduce((bagItems, a) => {
      bagItems.push(...a.bagItems)
      return bagItems
    }, [])

  return (
    <FlexBox py={5}>
      <Box display="flex" flexDirection="row">
        <Box display="flex">
          <Button
            onClick={() => {
              setShowModal("CancelItems")
              setData(cancellableBagItems)
            }}
          >
            Cancel Items
          </Button>
        </Box>
        <Box>
          {bagSections.map((bagSection, index) => {
            return (
              <BagColumn
                customer={customer}
                bagSection={bagSection}
                key={index}
                index={index}
                setShowModal={setShowModal}
                setData={setData}
              />
            )
          })}
        </Box>
      </Box>
    </FlexBox>
  )
}

const FlexBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflowX: "auto",
  backgroundColor: colors.black04,
})
