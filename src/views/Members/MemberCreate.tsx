import React, { useState } from "react"
import { NewMemberProps } from "views/Members/interfaces"
import styled from "styled-components"
import { ComponentError } from "components/"
import { Header } from "components/Header"
import { makeStyles } from "@material-ui/styles"
import * as Yup from "yup"
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
import { MEMBER_CREATE } from "./queries"
import { useMutation } from "@apollo/react-hooks"
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
      error: false,
      helperText: "This field is required",
    },
    lastName: {
      label: "Last Name",
      type: "phone",
      value: "",
      error: false,
      helperText: "This field is required",
    },
    email: {
      label: "Email Address",
      type: "email",
      value: "",
      error: false,
      helperText: "This field is required",
    },
    password: {
      label: "Password",
      type: "password",
      value: "",
      error: false,
      helperText: "At least 8 characters, include uppercase letter and number",
    },
    confirmPassword: {
      label: "Confirm Password",
      type: "password",
      value: "",
      error: false,
      helperText: "Passwords must match",
    },
    phone: {
      label: "Phone",
      type: "tel",
      value: "",
      error: false,
      helperText: "This field is required, e.g 123-456-7890",
    },
  }

  const [values, setValues] = useState<NewMemberProps>(memberValues)
  const [saveMember] = useMutation(MEMBER_CREATE)

  const createMember = values => {
    console.log("creating member with values", values)

    saveMember({
      variables: {
        email: values.email.value,
        password: values.password.value,
        firstName: values.firstName.value,
        lastName: values.lastName.value,
        details: {
          phoneNumber: values.phone.value,
        },
      },
    })
      .then(() => {
        console.log(" member created!", values)
      })
      .catch(error => {
        return <ComponentError />
      })
  }

  const handleFieldChange = event => {
    const key = event.target.name
    const value = event.target.value
    const validationResult = !isFieldValid(key, value)

    values[key].value = value
    values[key].error = validationResult

    setValues(currentValues => ({
      ...currentValues,
      key: values[key],
    }))
  }

  const useStyles = makeStyles(theme => ({
    customError: {
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f44336",
      },
      "& .MuiFormLabel-root.Mui-error": {
        color: "#f44336",
      },
      "& .MuiFormHelperText-root.Mui-error": {
        color: "#f44336",
      },
    },
  }))

  const isFieldValid = (type, value) => {
    const objectToValidate = { [type]: value }

    switch (type) {
      case "firstName":
        try {
          Yup.object()
            .shape({
              firstName: Yup.string().required("Required"),
            })
            .validateSync(objectToValidate)
          return true
        } catch (error) {
          return false
        }
      case "lastName":
        try {
          Yup.object()
            .shape({
              lastName: Yup.string().required("Required"),
            })
            .validateSync(objectToValidate)
          return true
        } catch (error) {
          return false
        }

      case "phone":
        try {
          Yup.object()
            .shape({
              phone: Yup.string()
                .required("Required")
                .min(8, "Must be at least 8 characters")
                .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "e.g 123-456-7890"),
            })
            .validateSync(objectToValidate)
          return true
        } catch (error) {
          return false
        }

      case "password":
        try {
          Yup.object()
            .shape({
              password: Yup.string()
                .required("Required")
                .min(8, "Must be at least 8 characters")
                .max(20, "Must be no more than 20 characters")
                .matches(/[A-Z]/, "Must include at least one uppercase letter")
                .matches(/[a-z]/, "Must include at least one lowercase letter")
                .matches(/1|2|3|4|5|6|7|8|9|0/, "Must include at least one number"),
            })
            .validateSync(objectToValidate)
          return true
        } catch (error) {
          return false
        }

      case "confirmPassword":
        return value === values.password.value

      case "email":
        try {
          Yup.object()
            .shape({
              email: Yup.string()
                .required("Required")
                .email("Invalid email"),
            })
            .validateSync(objectToValidate)
          return true
        } catch (error) {
          return false
        }

      default:
        return true
    }
  }

  const classes = useStyles()

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
                      className={values[key].error ? classes.customError : ""}
                      fullWidth
                      label={values[key].label}
                      name={key}
                      type={values[key].type}
                      onChange={handleFieldChange}
                      value={values[key].value}
                      variant="outlined"
                      inputProps={key === "phone" ? { pattern: PHONE_PATTERN } : {}}
                      error={values[key].error}
                      helperText={values[key].error ? values[key].helperText : ""}
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
