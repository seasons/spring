import { Box, Button, styled } from "@material-ui/core"
import { Spacer } from "components"
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
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="right">
          <Button
            onClick={() => {
              setShowModal("CancelItems")
              setData(cancellableBagItems)
            }}
            variant="contained"
          >
            Cancel Items
          </Button>
        </Box>
        <Spacer mb={4} />
        <Box display="flex" flexDirection="row">
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
