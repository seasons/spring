import { colors as muiColors } from "@material-ui/core"

const colors = {
  ...muiColors,
  black100: "#000",
  black85: "#252525",
  black65: "#5A5A5A",
  black50: "#7F7F7F",
  black15: "#D9D9D9",
  black04: "#F6F6F6",
  white100: "#fff",
  green: "#44524A",
  lightGreen: "#989F9B",
  blue: "#2B50DF",
}

export default {
  primary: {
    contrastText: colors.white100,
    dark: colors.black100,
    main: colors.black85,
    light: colors.black50,
  },
  secondary: {
    contrastText: colors.white100,
    dark: colors.black100,
    main: colors.black85,
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
    default: "#ffffff",
    paper: colors.white100,
  },
  divider: colors.grey[200],
}
