import React from "react"

interface ActionButtonsFieldProps {
  record?: { id: string; status: string }
  label?: string
  children: any
}

export const ActionButtons: React.FC<ActionButtonsFieldProps> = ({ record = {}, label, children }) => {
  return <>{React.Children.map(children, child => React.cloneElement(child, { record }, null))}</>
}
