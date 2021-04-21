import React from "react"
import { Box, Card as MuiCard, Typography, styled as muiStyled } from "@material-ui/core"
import { Text } from "components"
import { Checkbox } from "@material-ui/core"
import { theme } from "theme/theme"
import { WidgetTitle } from "views/Overview/Components/WidgetTitle"

export interface ControlPanelItem {
  itemChecked: boolean
  setItemChecked: (boolean) => void
  name: string
}
export interface ControlPanelProps {
  items: ControlPanelItem[]
  title: string
  containerProps?: any
}
export const ControlPanel: React.FC<ControlPanelProps> = ({ title, items, containerProps = {} }) => {
  return (
    <Card {...containerProps}>
      <WidgetTitle>{title}</WidgetTitle>
      {items.map(a => (
        <CheckFlexbox>
          <Checkbox
            checked={a.itemChecked}
            onChange={event => a.setItemChecked(event.target.checked)}
            color="secondary"
            name={a.name}
          />
          <ControlPanelText>{a.name}</ControlPanelText>
        </CheckFlexbox>
      ))}
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
