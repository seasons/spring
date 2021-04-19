import React, { useReducer } from "react"

import { Color } from "@material-ui/lab"
import SnackbarContext from "./SnackbarContext"

export type SnackbarState = {
  show: boolean
  message: string
  status: Color
}

enum SnackbarAction {
  Show = "SHOW",
  Close = "CLOSE",
}

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case SnackbarAction.Show:
          return {
            show: true,
            ...action.data,
          }
        case SnackbarAction.Close:
          return {
            ...prevState,
            show: false,
            message: "",
          }
      }
    },
    {
      status: "success" as Color,
      message: "",
      show: false,
    }
  )

  const snackbarContext = {
    showSnackbar: (data: Omit<SnackbarState, "show">) => {
      dispatch({ type: SnackbarAction.Show, data })
      setTimeout(() => dispatch({ type: SnackbarAction.Close }), 6000)
    },
    snackbarState,
    hideSnackbar: () => {
      dispatch({ type: SnackbarAction.Close })
    },
  }

  //@ts-ignore
  return <SnackbarContext.Provider value={snackbarContext}>{children}</SnackbarContext.Provider>
}
