import { colors as muiColors } from "@material-ui/core"

const white = "#FFFFFF"

const colors = {
  ...muiColors,
  black100: "#000",
  black85: "#252525",
  // black65: "#5A5A5A",
  black50: "#7F7F7F",
  black15: "#D9D9D9",
  black04: "#F6F6F6",
  white100: "#fff",
  green: "#44524A",
  lightGreen: "#989F9B",
  // blue: "#2B50DF",
}

export default {
  primary: {
    contrastText: white,
    dark: colors.black100,
    main: colors.black85,
    light: colors.black50,
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue.A700,
    light: colors.blue.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: "#F4F6F8",
    paper: colors.white100,
  },
  divider: colors.grey[200],
}
