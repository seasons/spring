import React, { useState } from "react"
import { SummaryCard } from "components/SummaryCard"
import moment from "moment"
import { CreditBalanceModal } from "./CreditBalanceModal"
import { LineItemModal } from "./LineItemModal"

export const BillingCard = ({ member, handleOpenLineItemModal }) => {
  const [openCreditModal, setOpeCreditModal] = useState(false)

  const handleOpenCreditModal = () => {
    setOpeCreditModal(true)
  }

  const membership = member?.membership
  const formatPrice = price =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  const financeMetrics =
    member?.membership?.financeMetrics?.map(a => {
      const name = a?.name
      return {
        fieldName: name,
        fieldValueFunc: () => formatPrice(a?.amount || 0),
        openModal: () => {
          handleOpenLineItemModal(name, a?.lineItems)
        },
        buttonText: "View Line Items",
      }
    }) || []

  return (
    <>
      <SummaryCard
        title="Billing Details"
        record={membership}
        rows={[
          {
            fieldName: "Plan Price",
            fieldValueFunc: record => formatPrice(record?.subscription?.planPrice),
          },
          {
            fieldName: "Credit Balance",
            fieldValueFunc: record => formatPrice(record?.creditBalance || 0),
            openModal: handleOpenCreditModal,
            buttonText: "Edit",
          },
          {
            fieldName: "Cycle Start Date",
            fieldValueFunc: record => moment(record?.currentRentalInvoice?.billingStartAt).format("LLL"),
          },
          {
            fieldName: "Cycle End Date",
            fieldValueFunc: record => moment(record?.currentRentalInvoice?.billingEndAt).format("LLL"),
          },
          ...financeMetrics,
        ]}
      />
      <CreditBalanceModal
        open={openCreditModal}
        onClose={() => setOpeCreditModal(false)}
        creditBalance={membership?.creditBalance}
        membership={membership}
      />
    </>
  )
}
