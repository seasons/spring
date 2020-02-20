import { createMuiTheme } from "@material-ui/core"
import palette from "./palette"
import typography from "./typography"
import overrides from "./overrides"

const baseTheme = {
  palette,
  typography,
  overrides,
}

export const DeviasTheme = createMuiTheme(baseTheme)
// export const DevuWithRtl = createMuiTheme({ ...baseTheme, direction: "rtl" })
