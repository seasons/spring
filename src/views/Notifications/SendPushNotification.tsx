import React, { useState } from "react"
import { DialogTitle, Loader, Spacer, Text } from "components"
import { Dialog, DialogContent, DialogActions, Button, makeStyles, Box } from "@material-ui/core"
import { Form } from "react-final-form"
import { useMutation } from "react-apollo"
import { TextField } from "fields"
import { NOTIFY_INTEREST, NOTIFY_USERS } from "./queries"
import { interests, routes } from "../../data/pushNotifications.json"
import { AutocompleteField } from "fields"
import { Alert } from "@material-ui/lab"
import { SearchProvider } from "components/Search/SearchProvider"
import { useSnackbarContext } from "components/Snackbar"
import { connectAutoComplete } from "react-instantsearch-dom"

export const SendPushNotificationModal = ({ onClose, open }) => {
  // Set up select data
  const userGroups = ["Active", "Waitlisted", "Authorized", "Created", "Paused"].map(a => ({
    label: `All ${a} Users`,
    value: a,
  }))
  const interestOptions = interests.map(a => ({ label: a.value, description: a.description, value: a.value }))

  // State used to render loading icon
  const [isSubmitting, setSubmitting] = useState(false)

  // Set up snackbar
  const { showSnackbar } = useSnackbarContext()

  // Set up submission handler
  const mutationOptions = {
    onCompleted: () => showSnackbar({ message: "Push Notif(s) sent!", status: "success" }),
    onError: err => showSnackbar({ message: err?.message, status: "error" }),
  }
  const [notifyInterest] = useMutation(NOTIFY_INTEREST, mutationOptions)
  const [pushNotifyUsers] = useMutation(NOTIFY_USERS, mutationOptions)
  const handleSubmit = async ({ title, body, users, interest, userGroup, route, uri }) => {
    setSubmitting(true)
    const data = { title, body, route, uri }

    if (users?.length > 0) {
      await pushNotifyUsers({
        variables: {
          where: { user: { email_in: users.map(a => a.value) } },
          data,
        },
      })
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
      await pushNotifyUsers({
        variables: {
          where: { status: userGroup.value },
          data,
        },
      })
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

  const dialogClasses = makeStyles(() => ({
    paper: { minWidth: "500px" },
  }))()

  return (
    <>
      <Dialog onClose={onClose} open={open} classes={dialogClasses}>
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
                    {showUsers && <SearchUserField />}
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
    </>
  )
}

const AutocompleteSearchBox = connectAutoComplete(({ hits, refine }) => {
  const options = hits
    .filter(a => a?.kindOf === "Customer")
    .map(a => ({ label: `${a?.user?.firstName} ${a?.user?.lastName} (${a.email})`, value: a.email }))

  return (
    <AutocompleteField
      options={options}
      name="users"
      label="Users"
      onInputChange={event => refine(event.target.value)}
      getOptionSelected={(option, value) => option.value === value.value || option === value}
    />
  )
})

const SearchUserField = () => {
  return (
    <Box>
      <SearchProvider>
        <AutocompleteSearchBox defaultRefinement="Regy" />
      </SearchProvider>
    </Box>
  )
}
