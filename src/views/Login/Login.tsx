import React from "react"
import { useHistory } from "react-router"
import { Box, Button, styled } from "@material-ui/core"
import { Form } from "react-final-form"
import { Spacer } from "components"
import { TextField } from "fields"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
      }
      token
      refreshToken
      expiresIn
    }
  }
`

export const LoginView = props => {
  const history = useHistory()
  const [login] = useMutation(LOG_IN)

  const handleSubmit = async ({ email, password }) => {
    const result = await login({
      variables: {
        email,
        password,
      },
    })
    if (result?.data) {
      const {
        data: { login: userSession },
      } = result

      localStorage.setItem("userSession", JSON.stringify(userSession))
      history.push("/")
    }
  }

  const initialValues = {
    email: "",
    password: "",
  }

  return (
    <Box maxWidth="400px" margin="100px auto">
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <Box mx={5}>
            <form {...props} onSubmit={handleSubmit}>
              <div>
                <TextField label="Email address" name="email" />
                <Spacer mt={1} />
                <TextField label="Password" name="password" type="password" />
              </div>
              <Spacer mt={2} />
              <SubmitButton size="large" type="submit" variant="contained">
                Sign in
              </SubmitButton>
            </form>
          </Box>
        )}
      />
    </Box>
  )
}

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
})
