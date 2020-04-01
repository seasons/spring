import { createMuiTheme } from "@material-ui/core"
import palette from "./palette"
import typography from "./typography"
import overrides from "./overrides"
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"

const baseTheme = {
  palette,
  typography,
  overrides,
} as ThemeOptions

export const theme = createMuiTheme(baseTheme)
