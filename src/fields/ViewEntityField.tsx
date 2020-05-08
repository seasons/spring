import React from "react"
import { Link as RouterLink } from "react-router-dom"

import { Button } from "@material-ui/core"

export interface ViewEntityFieldProps {
  record?: object
  source: string
  label?: string
  entityPath: string
  entityTab?: string
}

// NOTE: label isn't used but needs to be listed as a parameter in order to
// properly display label for column.
export const ViewEntityField: React.FC<ViewEntityFieldProps> = ({
  record = {},
  source,
  label,
  entityPath,
  entityTab,
}) => {
  const id = record[source]
  const entityLink = `/${entityPath}/${id}${entityTab ? `/${entityTab}` : ""}`

  return (
    <Button color="primary" component={RouterLink} size="small" to={entityLink} variant="outlined">
      View
    </Button>
  )
}
