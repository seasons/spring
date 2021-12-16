import { Box } from "@material-ui/core"
import { Spacer } from "components"
import React, { useState } from "react"
import { BillingCard } from "../Account/BillingCard"
import { LineItemModal } from "../Account/LineItemModal"
import { MemberSubViewProps } from "../interfaces"
import { RentalInvoiceCard } from "./RentalInvoiceCard"

export const BillingView: React.FC<MemberSubViewProps> = ({ member, adminKey, match }) => {
  const membership = member.membership
  const [showLineItemModal, setShowLineItemModal] = useState<string | null>(null)
  const [lineItems, setLineItems] = useState<any>(null)

  const handleOpenLineItemModal = (lineItemType: "Current balance" | "Estimated total", lineItems) => {
    setShowLineItemModal(lineItemType)
    setLineItems(lineItems)
  }

  return (
    <>
      <Box my={2}>
        <BillingCard member={member} handleOpenLineItemModal={handleOpenLineItemModal} />
        <Spacer mb={3} />
        <RentalInvoiceCard membership={membership} handleOpenLineItemModal={handleOpenLineItemModal} />
      </Box>
      <LineItemModal
        open={!!showLineItemModal}
        onClose={() => {
          setShowLineItemModal(null)
          setLineItems(null)
        }}
        mode={showLineItemModal}
        lineItems={lineItems}
      />
    </>
  )
}
