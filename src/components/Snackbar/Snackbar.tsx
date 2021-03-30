import React from "react"

import { Snackbar as MuiSnackbar } from "@material-ui/core"
import { Alert, Color } from "@material-ui/lab"
import { useSnackbarContext } from "./SnackbarContext"

export type SnackbarState = {
  show: boolean
  message: string
  status: Color
}

export const Snackbar: React.FC = () => {
  const { snackbarState, hideSnackbar } = useSnackbarContext()
  return (
    <MuiSnackbar
      open={snackbarState.show}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={hideSnackbar}
    >
      <Alert severity={snackbarState.status as Color} onClose={hideSnackbar}>
        {snackbarState.message}
      </Alert>
    </MuiSnackbar>
  )
}
