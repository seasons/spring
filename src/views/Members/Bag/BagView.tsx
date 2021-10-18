import React from "react"
import { BagColumns } from "./BagColumns"

export const BagView = ({ customer, adminKey }) => {
  const bagSections = customer?.bagSections

  return <BagColumns bagSections={bagSections} />
}
