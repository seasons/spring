import React from "react"

import { Button } from "@material-ui/core"

export interface EditButtonProps {
  onClick: () => void
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button color="primary" onClick={onClick} size="small" variant="outlined">
      Edit
    </Button>
  )
}
