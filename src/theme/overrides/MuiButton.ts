import { colors } from "theme/colors"

export default {
  root: {
    textTransform: "none",
    borderRadius: "10em",
  },
  contained: {
    boxShadow: "none",
    backgroundColor: colors.grey[100],
    "&:hover": {
      boxShadow: "none",
      backgroundColor: colors.grey[300],
    },
  },
  containedSecondary: {
    backgroundColor: colors.black04,
    color: colors.black100,
    "&:hover": {
      backgroundColor: colors.grey[300],
    },
  },
}
