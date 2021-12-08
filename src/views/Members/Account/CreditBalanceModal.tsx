import React, { useEffect, useState } from "react"
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
import gql from "graphql-tag"
import { useRefresh } from "ra-core"
import { useSnackbarContext } from "components/Snackbar"
import { formatPrice } from "utils/price"

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
  membership: any
}

export const UPDATE_CREDIT_BALACE = gql`
  mutation updateCreditBalance($membershipId: ID!, $amount: Int!, $reason: String!) {
    updateCreditBalance(membershipId: $membershipId, amount: $amount, reason: $reason)
  }
`

export const CreditBalanceModal: React.FunctionComponent<CreditBalanceModalProps> = ({
  open,
  onClose,
  creditBalance,
  membership,
}) => {
  const [value, setValue] = useState<any>(0)
  const [operation, setOperation] = useState<string>("Add")
  const amount = operation === "Add" ? value : -value
  const result = creditBalance + amount

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
      setValue(0)
      setCreditUpdateNotes("")
    },
    onError: error => {
      showSnackbar({
        message: `${error}`,
        status: "error",
      })
    },
  })

  useEffect(() => {
    if (creditBalance && creditBalance + amount < 0) {
      setValue(creditBalance)
    }
  }, [setValue, creditBalance, amount])

  if (!membership) {
    return null
  }

  const allowSave = amount != 0 && creditUpdateNotes.length > 0
  const handleSave = () => {
    updateCreditBalance({
      variables: { membershipId: membership.id, amount: amount, reason: creditUpdateNotes },
    })
  }

  if (!open) {
    return null
  }
  const localStringToNumber = s => {
    return Number(String(s).replace(/[^0-9.-]+/g, ""))
  }

  const currencyInput = document?.querySelector('input[type="currency"]')
  currencyInput?.addEventListener("focus", function onFocus(e: any) {
    const value = e.target.value
    e.target.value = value ? localStringToNumber(value) : ""
  })

  currencyInput?.addEventListener("blur", function onBlur(e: any) {
    const value = e?.target?.value

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
                  onClick={() => {
                    setOperation("Add")
                  }}
                >
                  Add
                </ToggleButton>
                <ToggleButton
                  value="Deduct"
                  onClick={() => {
                    setOperation("Deduct")
                  }}
                >
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
                      setValue(parseFloat(e.target.value) * 100)
                    }}
                  />
                  <Spacer mt={1} />
                  <Typography variant="h6">
                    After {`${operation}ing`}:{" "}
                    {typeof result === "number" ? formatPrice(result) : formatPrice(creditBalance)}
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
