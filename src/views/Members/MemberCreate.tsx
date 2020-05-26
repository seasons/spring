import React, { useState } from "react"
import { NewMemberProps } from "views/Members/interfaces"
import styled from "styled-components"
import { Header } from "components/Header"
import {
  Container,
  Button,
  Card as muiCard,
  CardActions as muiCardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Select as muiSelect,
  TextField,
} from "@material-ui/core"

const PHONE_PATTERN = "[0-9]{3}-[0-9]{3}-[0-9]{4}"

const Card = styled(muiCard)`
  width: 700px;
  margin: 100px auto;
  outline: none;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14),
    0px 8px 38px 7px rgba(0, 0, 0, 0.12);
`

export const CardActions = styled(muiCardActions)`
  justify-content: flex-end;
`

export const Select = styled(muiSelect)`
  margin-top: 5px;
`

export const MemberCreate: React.FC = props => {
  const memberValues = {
    firstName: {
      label: "First Name",
      type: "phone",
      value: "",
    },
    lastName: {
      label: "Last Name",
      type: "phone",
      value: "",
    },
    email: {
      label: "Email Address",
      type: "email",
      value: "",
    },
    password: {
      label: "Password",
      type: "password",
      value: "",
    },
    confirmPassword: {
      label: "Confirm Password",
      type: "password",
      value: "",
    },
    phone: {
      label: "Phone",
      type: "phone",
      value: "",
    },
  }

  const [values, setValues] = useState<NewMemberProps>(memberValues)

  const createMember = values => {
    console.log("creating member with values", values)
  }

  const handleFieldChange = event => {
    const key = event.target.name
    const value = event.target.value
    values[key].value = value

    setValues(currentValues => ({
      ...currentValues,
      key: currentValues[key],
    }))
  }

  const typeMap = {
    email: "email",
    birthday: "date",
    phone: "tel",
  }

  return (
    <Container maxWidth={false}>
      <Header
        title=""
        breadcrumbs={[
          {
            title: "Members",
            url: "/members",
          },
          {
            title: `New`,
            url: `/members/new`,
          },
        ]}
      />
      <Card>
        <form>
          <CardHeader title="New Member" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {Object.keys(memberValues).map(key => {
                return (
                  <Grid item md={6} xs={12} key={key}>
                    <TextField
                      fullWidth
                      label={values[key].label}
                      name={key}
                      type={typeMap[key] || values[key].type || "text"}
                      onChange={handleFieldChange}
                      value={values[key].value}
                      variant="outlined"
                      inputProps={key === "phone" ? { pattern: PHONE_PATTERN } : {}}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" onClick={() => createMember(values)} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}
