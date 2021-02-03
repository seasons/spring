import { colors } from "./colors"

export default {
  primary: {
    contrastText: colors.black100,
    dark: "#E9E9EB",
    main: "#E9E9EB",
    light: colors.white100,
  },
  secondary: {
    contrastText: colors.white100,
    dark: colors.black85,
    main: "#BABABC",
    light: colors.black50,
  },
  error: {
    contrastText: colors.white100,
    dark: colors.black100,
    main: colors.black85,
    light: colors.black50,
  },
  text: {
    primary: colors.black100,
    secondary: colors.black85,
    link: colors.black50,
  },
  link: colors.blue[800],
  icon: colors.black85,
  background: {
    default: colors.white100,
    paper: colors.white100,
  },
  divider: colors.grey[200],
}
