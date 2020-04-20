import React from "react"

export interface EntityCountFieldProps {
  record?: { bagItems: Array<Number> }
  entityName: string
  label?: string
}

// NOTE: label isn't used but needs to be listed as a parameter in order to
// properly display label for column.
export const EntityCountField: React.FC<EntityCountFieldProps> = ({ record, entityName, label }) => {
  return <div>{record?.[entityName]?.length}</div>
}
