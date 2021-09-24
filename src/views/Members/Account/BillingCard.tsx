import React from "react"
import { SummaryCard } from "components/SummaryCard"
import moment from "moment"

export const BillingCard = ({ member }) => {
  const membership = member.membership
  const formatPrice = price =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  return (
    <SummaryCard
      title="Billing"
      record={membership}
      rows={[
        {
          fieldName: "Plan Price",
          fieldValueFunc: record => formatPrice(record?.subscription?.planPrice),
        },
        {
          fieldName: "Credit Balance",
          fieldValueFunc: record => formatPrice(record?.creditBalance || 0),
        },
        {
          fieldName: "Cycle Start Date",
          fieldValueFunc: record => moment(record?.currentRentalInvoice?.billingStartAt).format("LLL"),
        },
        {
          fieldName: "Cycle End Date",
          fieldValueFunc: record => moment(record?.currentRentalInvoice?.billingEndAt).format("LLL"),
        },
      ]}
    />
  )
}
