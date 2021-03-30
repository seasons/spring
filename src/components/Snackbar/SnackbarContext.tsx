import React, { useContext } from "react"

import { SnackbarState } from "./SnackbarProvider"

export const useSnackbarContext = () => useContext(SnackbarContext)

const SnackbarContext = React.createContext({
  showSnackbar: (data: Omit<SnackbarState, "show">) => null,
  snackbarState: { status: "success", message: "", show: false },
})

export default SnackbarContext
