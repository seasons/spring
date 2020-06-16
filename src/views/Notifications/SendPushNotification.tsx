import React, { useState } from "react"
import { DialogTitle, Loader, Spacer, Text } from "components"
import { Dialog, DialogContent, DialogActions, styled, Button } from "@material-ui/core"
import { Form } from "react-final-form"
import { TextField } from "fields"
import { NOTIFY_INTEREST, NOTIFY_USER } from "./queries"
import { useMutation } from "@apollo/react-hooks"
import { interests, routes } from "../../data/pushNotifications.json"
import { AutocompleteField } from "fields"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { assign } from "lodash"

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
})

const GET_EMAILS = gql`
  query userEmails {
    users {
      fullName
      email
    }
  }
`

const createUserOption = u => `${u.fullName} (${u.email})`

export const SendPushNotificationModal = ({ onClose, open }) => {
  // Set up user select data
  const { data } = useQuery(GET_EMAILS)
  const userOptions = data?.users?.map(createUserOption)
  const userOptionsToEmailMap = data?.users?.reduce(
    (map, user) => assign(map, { [createUserOption(user)]: user.email }),
    {}
  )

  // State used to render loading icon
  const [isSubmitting, setSubmitting] = useState(false)

  // Set up submission handler
  const [notifyUser] = useMutation(NOTIFY_USER)
  const [notifyInterest] = useMutation(NOTIFY_INTEREST)
  const handleSubmit = async ({ title, body, users, interest, route, uri }) => {
    try {
      setSubmitting(true)
      const data = { title, body, route, uri }
      if (users.length > 0) {
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
    } catch (err) {
      setSubmitting(false)
      alert(err)
    }
    onClose()
    window.location.reload()
  }

  const initialValues = {
    title: "",
    body: "",
    users: [],
    interest: null,
    route: null,
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
                {/* TODO */}
                {/* {route === "Brand" && (
                  <>
                    <Spacer mt={1} />
                    <BrandSelect />
                  </>
                )} */}
                {/* TODO */}
                {/* {route === "Product" && (
                  <>
                    <Spacer mt={1} />
                    <ProductSelect />
                  </>
                )} */}
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
