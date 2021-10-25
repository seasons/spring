import React, { useState } from "react"
import { SummaryCard } from "components/SummaryCard"
import moment from "moment"
import { CreditBalanceModal } from "./CreditBalanceModal"

export const BillingCard = ({ member }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const membership = member?.membership
  const formatPrice = price =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <>
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
            openModal: handleOpenModal,
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
      <CreditBalanceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        creditBalance={membership?.creditBalance}
        membership={membership}
      />
    </>
  )
}
