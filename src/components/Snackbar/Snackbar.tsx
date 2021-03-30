import React from "react"

import { Snackbar as MuiSnackbar } from "@material-ui/core"
import { Alert, Color } from "@material-ui/lab"
import { useSnackbarContext } from "./SnackbarContext"

export type SnackbarState = {
  show: boolean
  message: string
  status: Color
}

export interface SnackbarProps {
  state?: SnackbarState
  showSnackbar?: (state: SnackbarState) => void
}

export const Snackbar: React.FC<SnackbarProps> = () => {
  const { snackbarState } = useSnackbarContext()
  return (
    <MuiSnackbar open={snackbarState.show} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert severity={snackbarState.status as Color}>{snackbarState.message}</Alert>
    </MuiSnackbar>
  )
}
