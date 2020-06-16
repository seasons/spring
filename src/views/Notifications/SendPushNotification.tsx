import React, { useState } from "react"
import { DialogTitle, Loader, Spacer, Text } from "components"
import { Dialog, DialogContent, DialogActions, styled, Button } from "@material-ui/core"
import { Form } from "react-final-form"
import { TextField } from "fields"
import { NOTIFY_INTEREST, NOTIFY_USER } from "./queries"
import { useMutation } from "@apollo/react-hooks"
import { TargetField } from "./components/targetField"
import { RouteField } from "./components/routeField"

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
})

export const SendPushNotificationModal = ({ onClose, open }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [notifyUser] = useMutation(NOTIFY_USER)
  const [notifyInterest] = useMutation(NOTIFY_INTEREST)

  const handleSubmit = async ({ title, body, target, route, uri }) => {
    try {
      setSubmitting(true)
      const data = { title, body, route, uri }
      if (target.includes("@")) {
        await notifyUser({
          variables: {
            data,
            email: target,
          },
        })
      } else {
        await notifyInterest({
          variables: {
            data,
            interest: target,
          },
        })
      }
    } catch (err) {
      setSubmitting(false)
      alert(err)
    }
    onClose()
    window.location.reload()
  }

  const initialValues = {
    title: "",
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle id="send-push-notif-modal" onClose={onClose}>
        Send Push Notification
      </DialogTitle>
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, values: { route } }) => {
            return (
              <form onSubmit={handleSubmit}>
                <TextField label="Title" name="title" autoFocus maxLength={50} />
                <Spacer mt={1} />
                <TextField label="Body" name="body" maxLength={110} />
                <Spacer mt={1} />
                <TargetField />
                <Spacer mt={1} />
                <RouteField />
                <Spacer mt={1} />
                {route === "Webview" && <TextField label="URI" name="uri" />}
                <DialogActions>
                  <SubmitButton size="large" type="submit" variant="contained" fullWidth>
                    {isSubmitting ? <Loader size={20} /> : "Send"}
                  </SubmitButton>
                </DialogActions>
              </form>
            )
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
