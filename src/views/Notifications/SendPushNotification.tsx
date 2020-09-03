import React, { useState } from "react"
import { DialogTitle, Loader, Spacer, Text } from "components"
import { Dialog, DialogContent, DialogActions, Button, makeStyles } from "@material-ui/core"
import { Form } from "react-final-form"
import { TextField } from "fields"
import { NOTIFY_INTEREST, NOTIFY_USER, GET_USERS } from "./queries"
import { useMutation } from "@apollo/react-hooks"
import { interests, routes } from "../../data/pushNotifications.json"
import { AutocompleteField } from "fields"
import { useQuery } from "react-apollo"
import { SnackbarState, Snackbar } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"
import { Alert } from "@material-ui/lab"

const createUserOption = u => ({ label: `${u.fullName} (${u.email})`, value: u.email })

export const SendPushNotificationModal = ({ onClose, open }) => {
  // Set up select data
  const { data } = useQuery(GET_USERS)
  const userOptions = data?.users?.map(createUserOption)
  const userGroups = ["Active", "Waitlisted", "Authorized", "Created", "Paused"].map(a => ({
    label: `All ${a} Users`,
    value: data?.users?.filter(b => b?.customer?.status === a).map(c => c.email),
  }))
  const interestOptions = interests.map(a => ({ label: a.value, description: a.description, value: a.value }))

  // State used to render loading icon
  const [isSubmitting, setSubmitting] = useState(false)

  // Set up snackbar
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  // Set up submission handler
  const [notifyUser] = useMutation(NOTIFY_USER)
  const [notifyInterest] = useMutation(NOTIFY_INTEREST)
  const refresh = useRefresh()
  const handleSubmit = async ({ title, body, users, interest, userGroup, route, uri }) => {
    try {
      setSubmitting(true)
      const data = { title, body, route, uri }
      const sendPushNotifToEmail = email => notifyUser({ variables: { data, email } })

      if (users?.length > 0) {
        await Promise.all(users.map(a => a.value).map(email => sendPushNotifToEmail(email)))
      }

      if (!!interest) {
        await notifyInterest({
          variables: {
            data,
            interest: interest.value,
          },
        })
      }

      if (!!userGroup) {
        await Promise.all(userGroup.value.map(email => sendPushNotifToEmail(email)))
      }

      toggleSnackbar({ show: true, message: "Push Notif(s) sent!", status: "success" })
      refresh()
    } catch (err) {
      toggleSnackbar({ show: true, message: err?.message, status: "error" })
    }
    setSubmitting(false)
    onClose()
  }

  const initialValues = {
    title: "",
    body: "",
    users: [],
    route: null,
    interest: "",
  }

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        classes={makeStyles(() => ({
          paper: { minWidth: "500px" },
        }))()}
      >
        <DialogTitle id="send-push-notif-modal" onClose={onClose}>
          Send Push Notification
        </DialogTitle>

        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={({ users, interest, userGroup, route, uri }) => {
            const errors = {}
            if (users.length === 0 && !interest && !userGroup) {
              const errorString = "Must include a user, interest, or user group"
              errors["users"] = errorString
              errors["interest"] = errorString
              errors["userGroup"] = errorString
            }
            if (route === "Webview" && !uri) {
              errors["uri"] = "Must supply uri if route is Webview"
            }
            return errors
          }}
          render={({ handleSubmit, values: { route, users, userGroup, interest } }) => {
            const showUsers = !interest && !userGroup
            const showInterest = users.length === 0 && !userGroup
            const showUserGroups = users.length === 0 && !interest
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Alert severity="warning">Be careful! This will send push notifications to *real* users :)</Alert>
                    <Spacer mt={2} />
                    <Text variant="h6" style={{ marginLeft: "5px" }}>
                      Send To
                    </Text>
                    <Spacer mt={1} />
                    {showUsers && <AutocompleteField label="User(s)" name="users" options={userOptions} />}
                    <Spacer mt={1} />
                    {showInterest && (
                      <AutocompleteField label="Interest" name="interest" options={interestOptions} multiple={false} />
                    )}
                    {!!interest && (
                      <>
                        <Spacer mt={1} />
                        <Text variant="body1" style={{ marginLeft: "6px" }}>
                          ({interest.description})
                        </Text>
                      </>
                    )}
                    <Spacer mt={1} />
                    {showUserGroups && (
                      <AutocompleteField label="User Group" name="userGroup" options={userGroups} multiple={false} />
                    )}
                    <Spacer mt={2} />
                    <Text variant="h6" style={{ marginLeft: "5px" }}>
                      Content
                    </Text>
                    <Spacer mt={1} />
                    <TextField
                      label="Title"
                      name="title"
                      autoFocus
                      maxLength={50}
                      asterisk
                      placeholder={"max 50 chars"}
                    />
                    <Spacer mt={1} />
                    <TextField
                      label="Body"
                      name="body"
                      maxLength={110}
                      multiline
                      rows={3}
                      asterisk
                      placeholder={"max 110 chars"}
                    />
                    <Spacer mt={1} />
                    <AutocompleteField label="Route" name="route" multiple={false} options={routes} />
                    {route === "Webview" && (
                      <>
                        <Spacer mt={2} />
                        <TextField label="URI" name="uri" asterisk />
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus color="primary" type="submit" size="large" variant="contained">
                      {isSubmitting ? <Loader size={20} /> : "Send"}
                    </Button>
                  </DialogActions>
                </form>
              </>
            )
          }}
        />
      </Dialog>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
