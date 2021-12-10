import { Box } from "@material-ui/core"
import { Spacer } from "components"
import React from "react"
import { BillingCard } from "../Account/BillingCard"
import { MemberSubViewProps } from "../interfaces"
import { RentalInvoiceCard } from "./RentalInvoiceCard"

export const BillingView: React.FC<MemberSubViewProps> = ({ member, adminKey, match }) => {
  const membership = member.membership
  console.log(member)
  return (
    <Box my={2}>
      <BillingCard member={member} />
      <Spacer mb={3} />
      <RentalInvoiceCard membership={membership} />
    </Box>
  )
}
