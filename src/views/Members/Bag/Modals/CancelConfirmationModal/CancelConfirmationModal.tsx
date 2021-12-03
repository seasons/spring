import React from "react"

interface CancelConfirmationModalProps {
  open: boolean
  onClose?: () => void
  bagItem: any
}

export const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({ open, onClose, bagItem }) => {
  return <div></div>
}
