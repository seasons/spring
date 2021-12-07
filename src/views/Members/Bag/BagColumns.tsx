import { Box, styled } from "@material-ui/core"
import React from "react"
import { colors } from "theme/colors"
import { BagColumn } from "./BagColumn"

export const BagColumns = ({ customer, bagSections, setData, setShowModal }) => {
  const queuedSection = bagSections.find(section => section.status === "Queued")

  console.log("queuedSection", queuedSection)
  return (
    <FlexBox py={5}>
      {bagSections.map((bagSection, index) => {
        return (
          <BagColumn
            customer={customer}
            bagSection={bagSection}
            key={index}
            index={index}
            setShowModal={setShowModal}
            setData={setData}
            hasQueuedItems={queuedSection?.bagItems.length > 0}
          />
        )
      })}
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
