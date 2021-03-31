import React from "react"
import { Box, Card as MuiCard, Typography, styled as muiStyled } from "@material-ui/core"
import { Text } from "components"
import { Checkbox } from "@material-ui/core"
import { theme } from "theme/theme"

export const ControlPanel = ({
  title,
  showActive,
  setShowActive,
  showPaused,
  setShowPaused,
  showAdmissable,
  setShowAdmissable,
  containerProps = {},
}) => {
  return (
    <Card {...containerProps}>
      <Typography
        component="h2"
        style={{ color: theme.palette.primary.contrastText, letterSpacing: 1 }}
        gutterBottom
        variant="overline"
      >
        {title}
      </Typography>
      <CheckFlexbox>
        <Checkbox
          checked={showActive}
          onChange={event => setShowActive(event.target.checked)}
          color="secondary"
          name={"Active"}
        />
        <ControlPanelText>Active</ControlPanelText>
      </CheckFlexbox>
      <CheckFlexbox>
        <Checkbox
          checked={showPaused}
          onChange={event => setShowPaused(event.target.checked)}
          color="secondary"
          name={"Paused"}
        />
        <ControlPanelText>Paused</ControlPanelText>
      </CheckFlexbox>
      <CheckFlexbox>
        <Checkbox
          checked={showAdmissable}
          onChange={event => setShowAdmissable(event.target.checked)}
          color="secondary"
          name={"Admissable"}
        />
        <ControlPanelText>Admissable</ControlPanelText>
      </CheckFlexbox>
    </Card>
  )
}

const CheckFlexbox = muiStyled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
})

const Card = muiStyled(MuiCard)({
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  position: "absolute",
  bottom: 10,
  left: 10,
  background: theme.palette.primary.main,
})

const ControlPanelText = ({ children }) => <Text variant="body1">{children}</Text>
