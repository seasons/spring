import React from "react"

interface ActionButtonsProps {
  record?: { id: string; status: string }
  label?: string
  children: any
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ record = {}, label, children }) => {
  return <>{React.Children.map(children, child => React.cloneElement(child, { record }, null))}</>
}
