import React, { useState } from "react"
import { DialogTitle, Loader } from "components"
import { Dialog, DialogContent, DialogActions, styled, Button } from "@material-ui/core"
import { Form } from "react-final-form"
import { TextField } from "fields"
import { NOTIFY_USER } from "./queries"
import { useMutation } from "@apollo/react-hooks"

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
})

export const SendPushNotificationModal = ({ onClose, open }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [notifyUser] = useMutation(NOTIFY_USER)

  const handleSubmit = async ({ title }) => {
    try {
      setSubmitting(true)
      await notifyUser({
        variables: {
          data: { title, body: "placeholder body" },
          id: "ck2pbxqsc003p0703ic3akj4v",
        },
      })
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
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField label="Title" name="title" autoFocus />
              <DialogActions>
                <SubmitButton size="large" type="submit" variant="contained" fullWidth>
                  {isSubmitting ? <Loader size={20} /> : "Create"}
                </SubmitButton>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  )
}
