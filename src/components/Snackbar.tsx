import React from "react"

import { Snackbar as MuiSnackbar } from "@material-ui/core"
import { Alert, Color } from "@material-ui/lab"

export type SnackbarState = {
  show: boolean
  message: string
  status: Color
}

export interface SnackbarProps {
  state: SnackbarState
  toggleSnackbar: (state: SnackbarState) => void
}

export const Snackbar: React.FC<SnackbarProps> = ({ state, toggleSnackbar }) => {
  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }
  return (
    <MuiSnackbar
      open={state.show}
      autoHideDuration={6000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={hideSnackbar} severity={state.status}>
        {state.message}
      </Alert>
    </MuiSnackbar>
  )
}
