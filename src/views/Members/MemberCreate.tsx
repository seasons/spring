import React, { useState } from "react"
import { NewMemberProps } from "views/Members/interfaces"
import styled from "styled-components"
import {
  Container,
  Theme,
  Button,
  Card as muiCard,
  CardActions as muiCardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select as muiSelect,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(20),
    paddingLeft: theme.spacing(10),
  },
}))
const PHONE_PATTERN = "[0-9]{3}-[0-9]{3}-[0-9]{4}"
export const Card = styled(muiCard)`
  top: 50%;
  left: 50%;
  width: 700px;
  outline: none;
  position: absolute;
  max-width: 100%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14),
    0px 8px 38px 7px rgba(0, 0, 0, 0.12);
  max-height: 100%;
  overflow-y: auto;
`
export const CardActions = styled(muiCardActions)`
  justify-content: flex-end;
`

export const Select = styled(muiSelect)`
  margin-top: 5px;
`

export const MemberCreate: React.FC = props => {
  const classes = useStyles()
  const defaultMemmber = {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  }
  const [values, setValues] = useState<NewMemberProps>(defaultMemmber)

  const createMember = values => {
    console.log("creating member with values", values)
  }

  const handleFieldChange = event => {
    const key = event.target.name
    values[key] = event.target.value

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
    <Container maxWidth="lg" className={classes.root}>
      <Card>
        <form>
          <CardHeader title="New Member" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  // name={key}
                  type="text"
                  onChange={handleFieldChange}
                  value={values.firstName}
                  variant="outlined"
                  // inputProps={key === "phone" ? { pattern: PHONE_PATTERN } : {}}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            {/* <Button onClick={onClose}>Close</Button> */}
            <Button color="primary" onClick={() => createMember(values)} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}
