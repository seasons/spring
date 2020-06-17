import React, { useState } from "react"
import { DialogTitle, Loader, Spacer } from "components"
import { Dialog, DialogContent, DialogActions, styled, Button, makeStyles } from "@material-ui/core"
import { Form, Field } from "react-final-form"
import { TextField } from "fields"
import { NOTIFY_INTEREST, NOTIFY_USER, GET_USERS } from "./queries"
import { useMutation } from "@apollo/react-hooks"
import { interests, routes } from "../../data/pushNotifications.json"
import { AutocompleteField } from "fields"
import { useQuery } from "react-apollo"
import { assign } from "lodash"
import { SnackbarState, Snackbar } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"
import { TextField as MuiTextField } from "@material-ui/core"

const createUserOption = u => `${u.fullName} (${u.email})`

const StyledTextField = styled(MuiTextField)({
  borderRadius: 4,
})

export const SendPushNotificationModal = ({ onClose, open }) => {
  // Set up user select data
  const { data } = useQuery(GET_USERS)
  const userOptions = data?.users?.map(createUserOption)
  const userOptionsToEmailMap = data?.users?.reduce(
    (map, user) => assign(map, { [createUserOption(user)]: user.email }),
    {}
  )

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
  const handleSubmit = async ({ title, body, users, interest, route, uri }) => {
    try {
      setSubmitting(true)
      const data = { title, body, route, uri }
      if (users?.length > 0) {
        await Promise.all(users.map(a => notifyUser({ variables: { data, email: userOptionsToEmailMap[a] } })))
      }
      if (!!interest) {
        await notifyInterest({
          variables: {
            data,
            interest,
          },
        })
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
    interest: null,
    route: null,
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
          validate={({ users, interest }) => {
            console.log(users)
            console.log(interest)
            if (users?.length === 0 && !interest) {
              const errorString = "Must supply at least 1 user or interest"
              return { users: errorString, interest: errorString }
            }
            return {}
          }}
          render={({ handleSubmit, values: { route, ...restOfValues }, ...rest }) => {
            console.log(handleSubmit)
            console.log(rest)
            console.log(restOfValues)
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
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
                    <AutocompleteField label="User(s)" name="users" options={userOptions} />
                    <Spacer mt={1} />
                    <AutocompleteField label="Interest" name="interest" multiple={false} options={interests} />
                    <Spacer mt={1} />
                    <AutocompleteField label="Route" name="route" multiple={false} options={routes} />
                    {route === "Webview" && (
                      <>
                        <Spacer mt={1} />
                        <TextField label="URI" name="uri" />
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
