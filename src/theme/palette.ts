import { colors } from "./colors"

export default {
  primary: {
    contrastText: colors.black100,
    dark: colors.white80,
    main: colors.white80,
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
    link: colors.black100,
  },
  button: {
    primary: colors.black100,
    secondary: colors.black85,
    link: colors.black100,
    main: colors.black85,
  },
  link: colors.blue[800],
  icon: colors.black85,
  background: {
    default: colors.white100,
    paper: colors.white100,
  },
  divider: colors.grey[200],
}
