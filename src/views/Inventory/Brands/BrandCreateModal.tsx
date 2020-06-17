import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Form } from "react-final-form"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core"

import { DatePickerField, SelectField, TextField } from "fields"
import { DialogTitle, Loader, Snackbar, Spacer, Text } from "components"
import { SnackbarState } from "components/Snackbar"
import { CREATE_BRAND } from "./mutations"

interface BrandCreateModalProps {
  open: boolean
  onClose?: () => void
}

export const BrandCreateModal: React.FC<BrandCreateModalProps> = ({ open, onClose }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const [createBrand] = useMutation(CREATE_BRAND, {
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const onSubmit = values => {
    console.log("VALUES:", values)
    const { brandCode, brandTier, description, name, sinceDate, websiteURL } = values
    // setIsMutating(true)
    // setIsMutating(false)
    // if (result?.data) {
    //   onClose?.()
    // }
  }

  const brandTierChoices = [
    "Tier0",
    "Tier1",
    "Tier2",
    "Niche",
    "Upcoming",
    "Retro",
    "Boutique",
    "Local",
    "Discovery",
  ].map(choice => ({ display: choice, value: choice }))
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Create brand
      </DialogTitle>
      <Form onSubmit={onSubmit}>
        {({
          handleSubmit,
          form: {
            mutators: { setValue },
          },
          values: formValues,
          errors,
        }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <Box my={1} width={550}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Text variant="h6">Name*</Text>
                        <Spacer mt={1} />
                        <TextField name="name" placeholder="Enter a name" requiredString />
                      </Grid>
                      <Grid item xs={6}>
                        <Text variant="h6">Brand code*</Text>
                        <Spacer mt={1} />
                        <TextField name="brandCode" placeholder="Enter a brand code" requiredString />
                      </Grid>
                      <Grid item xs={6}>
                        <Text variant="h6">Brand tier*</Text>
                        <Spacer mt={1} />
                        <SelectField name="brandTier" choices={brandTierChoices} requiredString />
                      </Grid>
                      <Grid item xs={6}>
                        <Text variant="h6">Since</Text>
                        <Spacer mt={1} />
                        <DatePickerField name="sinceDate" format="yyyy" views={["year"]} optionalDate />
                      </Grid>
                      <Grid item xs={12}>
                        <Text variant="h6">Description*</Text>
                        <Spacer mt={1} />
                        <TextField multiline name="description" placeholder="Enter a description" requiredString />
                      </Grid>
                      <Grid item xs={12}>
                        <Text variant="h6">Website URL</Text>
                        <Spacer mt={1} />
                        <TextField name="websiteURL" placeholder="Enter a url" />
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus color="primary" variant="contained" type="submit">
                    {isMutating ? <Loader size={20} /> : "Create"}
                  </Button>
                </DialogActions>
              </form>
            </>
          )
        }}
      </Form>
    </Dialog>
  )
}
