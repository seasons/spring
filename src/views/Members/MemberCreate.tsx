import React, { useState } from "react"
import { times, random, upperFirst } from "lodash"
import { NewMemberProps, CreateMemberProps } from "views/Members/interfaces"
import { makeStyles } from "@material-ui/styles"
import InputMask from "react-input-mask"
import * as Yup from "yup"
import { DialogTitle } from "components"
import { Button, Box, Dialog, DialogContent, DialogActions, Grid, TextField, Snackbar, Theme } from "@material-ui/core"
import { MEMBER_CREATE } from "./queries"
import { useMutation } from "@apollo/react-hooks"
import { Alert, Color } from "@material-ui/lab"
import { Loader } from "components"
import { colors } from "theme"

export const MemberCreateModal: React.FC<CreateMemberProps> = ({ history, open, onClose }) => {
  const memberValues = {
    firstName: {
      label: "First Name *",
      type: "phone",
      value: "",
      error: false,
      helperText: "This field is required",
    },
    lastName: {
      label: "Last Name *",
      type: "phone",
      value: "",
      error: false,
      helperText: "This field is required",
    },
    email: {
      label: "Email Address *",
      type: "email",
      value: "",
      error: false,
      helperText: "This field is required",
    },
    phone: {
      label: "Phone *",
      type: "tel",
      value: "",
      error: false,
      helperText: "This field is required, e.g 123-456-7890",
    },
    birthday: {
      label: "Birthday *",
      type: "date",
      value: "1990-01-01",
      error: false,
      helperText: "This field is required",
    },
  }

  const [values, setValues] = useState<NewMemberProps>(memberValues)
  const [isSubmitting, setSubmitting] = useState(false)
  const [saveMember] = useMutation(MEMBER_CREATE)

  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })

  const createMember = values => {
    setSubmitting(true)
    saveMember({
      variables: {
        firstName: values.firstName.value,
        lastName: values.lastName.value,
        email: values.email.value,
        // generate random password with length of 10 characters, first letter capitalized and a gauranteed number in it
        password: upperFirst(times(9, () => random(35).toString(36)).join("") + "1"),
        details: {
          phoneNumber: values.phone.value,
          birthday: values.birthday.value,
        },
      },
    })
      .then(resp => {
        history.push(`/members/${resp.data.signup.customer.id}/account`)
      })
      .catch(error => {
        setSubmitting(false)
        console.log("error saving member:", error)
        toggleSnackbar({
          show: true,
          message: "Error creating member",
          status: "error",
        })
      })
  }

  const handleFieldChange = event => {
    const key = event.target.name
    const value = event.target.value

    values[key].value = value

    setValues(currentValues => ({
      ...currentValues,
      key: values[key],
    }))
  }

  const handleFieldBlur = event => {
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

  const useStyles = makeStyles<Theme>(theme => ({
    customError: {
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.red500,
      },
      "& .MuiFormLabel-root.Mui-error": {
        color: colors.red500,
      },
      "& .MuiFormHelperText-root.Mui-error": {
        color: colors.red500,
      },
    },
    cardHeader: {
      backgroundColor: theme.palette.primary.dark,
      "& .MuiTypography-h5": {
        color: theme.palette.primary.contrastText,
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

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  const classes = useStyles()

  if (!open) {
    return null
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          New Member
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {Object.keys(memberValues).map((key, index) => {
              if (key === "phone") {
                return (
                  <Grid item md={6} xs={12} key={key}>
                    <InputMask
                      mask="999-999-9999"
                      value={values[key].value}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                    >
                      {inputProps => (
                        <TextField
                          {...inputProps}
                          type="tel"
                          className={values[key].error ? classes.customError : ""}
                          fullWidth
                          label={values[key].label}
                          variant="outlined"
                          error={values[key].error}
                          helperText={values[key].error ? values[key].helperText : ""}
                          name={key}
                        />
                      )}
                    </InputMask>
                  </Grid>
                )
              }
              return (
                <Grid item md={6} xs={12} key={key}>
                  <TextField
                    autoFocus={index === 0}
                    className={values[key].error ? classes.customError : ""}
                    fullWidth
                    label={values[key].label}
                    name={key}
                    type={values[key].type}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    value={values[key].value}
                    variant="outlined"
                    error={values[key].error}
                    helperText={values[key].error ? values[key].helperText : ""}
                  />
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box mr={3} my={1}>
            <Button
              disabled={Object.keys(values).filter(key => values[key].error).length > 0}
              color="primary"
              onClick={() => createMember(values)}
              variant="contained"
            >
              {isSubmitting ? <Loader size={20} /> : "Create"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
