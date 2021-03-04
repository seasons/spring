import { CustomerStatus } from "generated/globalTypes"
import { ActionButtonProps } from "./interfaces"
import React from "react"
import { Button, Box, ButtonProps } from "@material-ui/core"

export const AuthorizeButton: React.FC<ActionButtonProps & { buttonProps?: ButtonProps }> = props => {
  const invited = props.record?.status === CustomerStatus.Invited
  const waitlisted = props.record?.status === CustomerStatus.Waitlisted
  if (invited || waitlisted) {
    return (
      <Box component="span" ml={1}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => props.action(props.record)}
          {...props.buttonProps}
        >
          Authorize
        </Button>
      </Box>
    )
  }
  return null
}
