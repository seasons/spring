import { colors } from "theme/colors"

export default {
  root: {
    textTransform: "none",
    borderRadius: "10em",
    color: colors.black85,
  },
  textPrimary: {
    color: colors.black65,
  },
  contained: {
    boxShadow: "none",
    backgroundColor: "#E9E9EB",
    color: colors.black85,
    "&:hover": {
      boxShadow: "none",
    },
  },
  containedSecondary: {
    backgroundColor: colors.black100,
    color: colors.white100,
  },
  containedPrimary: {
    backgroundColor: colors.black04,
    color: colors.black100,
    "&:hover": {
      backgroundColor: colors.grey[300],
    },
  },
}
