import { login as loginAction } from "actions/sessionActions"
import { Spacer, Logo, Text } from "components"
import { TextField } from "fields"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Form } from "react-final-form"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import { Box, Button, Paper, styled, Grid } from "@material-ui/core"
import { colors } from "theme"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
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

export interface LoginViewProps {
  props?: any
}
export const LoginView: React.FunctionComponent<LoginViewProps> = props => {
  const history = useHistory()
  const [error, setError] = useState<string | null>(null)
  const [login] = useMutation(LOG_IN, {
    onError: err => {
      console.error(err)
      setError(err.message)
    },
  })
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  if (session?.token) {
    history.push("/")
  }

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
      dispatch(loginAction(userSession))
      history.push("/")
    }
  }

  const initialValues = {
    email: "",
    password: "",
  }

  return (
    <Container>
      <Box maxWidth="400px" margin="0 auto">
        <Paper>
          <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <Box mx={5} pb={3}>
                <Grid container item justify="center">
                  <Logo color="black" mx="auto" my={2} />
                </Grid>
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField label="Email address" name="email" autoFocus />
                    <Spacer mt={1} />
                    <TextField label="Password" name="password" type="password" />
                  </div>
                  <Spacer mt={4} />
                  <SubmitButton size="large" type="submit" variant="contained" fullWidth>
                    Sign in
                  </SubmitButton>
                  {error && (
                    <Box my={1}>
                      <Text color={colors.red[500]}>{error}</Text>
                    </Box>
                  )}
                </form>
              </Box>
            )}
          />
        </Paper>
      </Box>
    </Container>
  )
}

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  paddingTop: "100px",
  backgroundColor: colors.black04,
  position: "absolute",
})

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: 40,
})
