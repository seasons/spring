import { capitalize } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"
import { useMutation } from "@apollo/react-hooks"

import {
  Box,
  Button,
  Card as muiCard,
  CardActions as muiCardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  Select as muiSelect,
  TextField,
  Typography,
} from "@material-ui/core"

import { Spacer } from "components"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { gql } from "apollo-boost"
import { useRefresh } from "ra-core"
import { useSnackbarContext } from "components/Snackbar"

export const Card = styled(muiCard)`
  top: 50%;
  left: 50%;
  width: 500px;
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

interface CreditBalanceModalProps {
  open: boolean
  onClose: () => any
  creditBalance: any
}

export const UPDATE_CREDIT_BALACE = gql`
  mutation updateCreditBalance($newCreditBalance: Int, $update: Int, $reason: String) {
    updateCreditBalance(newCreditBalance: $newCreditBalance, update: $update, reason: $reason)
  }
`

export const CreditBalanceModal: React.FunctionComponent<CreditBalanceModalProps> = ({
  open,
  onClose,
  creditBalance,
}) => {
  const [value, setValue] = useState<any>(0)
  const [operation, setOperation] = useState<string>("Add")
  const updateValue = parseInt(value)
  const result =
    (operation === "Add" ? creditBalance + updateValue * 100 : creditBalance - updateValue * 100) || creditBalance
  const formatPrice = price => {
    return (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  const [creditUpdateNotes, setCreditUpdateNotes] = useState<string>("")
  const { showSnackbar } = useSnackbarContext()
  const refresh = useRefresh()
  const [updateCreditBalance] = useMutation(UPDATE_CREDIT_BALACE, {
    onCompleted: () => {
      showSnackbar({
        message: `Credit balance was successfully updated`,
        status: "success",
      })
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: `${error}`,
        status: "error",
      })
    },
  })

  const allowSave = updateValue > 0
  const handleSave = () => {
    updateCreditBalance({
      variables: { newCreditBalance: result, update: updateValue, reason: creditUpdateNotes },
    })
  }

  if (!open) {
    return null
  }
  const localStringToNumber = s => {
    return Number(String(s).replace(/[^0-9.-]+/g, ""))
  }

  var currency = "USD"
  var currencyInput = document?.querySelector('input[type="currency"]')
  currencyInput?.addEventListener("focus", function onFocus(e: any) {
    var value = e.target.value
    e.target.value = value ? localStringToNumber(value) : ""
  })

  currencyInput?.addEventListener("blur", function onBlur(e: any) {
    var value = e?.target?.value

    var options = {
      maximumFractionDigits: 2,
      currency: currency,
      style: "currency",
      currencyDisplay: "symbol",
    }

    e.target.value = value ? formatPrice(localStringToNumber(value) * 100) : ""
  })
  return (
    <Modal onClose={onClose} open={open}>
      <Card>
        <form>
          <CardHeader title={"Credit Balance"} />
          <Divider />
          <CardContent>
            <Box display="flex" justifyContent="center">
              <ToggleButtonGroup color="primary" value="" exclusive>
                <ToggleButton
                  value="Add"
                  onClick={() => setOperation("Add")}
                  {...(operation === "Add" ? "selected" : "")}
                >
                  Add
                </ToggleButton>
                <ToggleButton value="Deduct" onClick={() => setOperation("Deduct")}>
                  Deduct
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Spacer mt={5} />
            <Grid container spacing={3}>
              <Box display="flex" justifyContent="space-around" width="100%">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6"> Current balance: {formatPrice(creditBalance)} </Typography>
                  <Typography variant="h6">{`${operation === "Add" ? "+" : "-"}`}</Typography>
                  <TextField
                    type="currency"
                    placeholder={`Credits ${operation}ed`}
                    onChange={e => {
                      setValue(e.target.value)
                    }}
                  />
                  <Spacer mt={1} />
                  <Typography variant="h6">
                    After {`${operation}ing`}: {formatPrice(result)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <TextField
                    type="text"
                    multiline
                    variant="outlined"
                    rows={3}
                    label={`Credit Update Notes`}
                    name="notes"
                    value={creditUpdateNotes}
                    onChange={e => setCreditUpdateNotes(e.target.value)}
                  />
                </Box>
              </Box>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={onClose}>Close</Button>
            <Button color="primary" onClick={handleSave} variant="contained" disabled={!allowSave}>
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  )
}
