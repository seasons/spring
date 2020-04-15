import React from "react"

export interface FullNameFieldProps {
  record?: { user: { firstName: string; lastName: string } }
  label?: string
}

// NOTE: label isn't used but needs to be listed as a parameter in order to
// properly display label for column.
export const FullNameField: React.FC<FullNameFieldProps> = ({ record, label }) => {
  const first = record?.user?.firstName
  const last = record?.user?.lastName
  return <div>{`${first} ${last}`}</div>
}
