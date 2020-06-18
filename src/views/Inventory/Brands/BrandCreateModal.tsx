import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { useMutation } from "react-apollo"
import { Form } from "react-final-form"
import slugify from "slugify"

import { Box, Button, Dialog, DialogActions, DialogContent, Grid } from "@material-ui/core"

import { DatePickerField, SelectField, TextField } from "fields"
import { DialogTitle, Loader, Spacer, Text } from "components"
import { SnackbarState } from "components/Snackbar"
import { CREATE_BRAND } from "./mutations"

interface BrandCreateModalProps {
  open: boolean
  toggleSnackbar: (state: SnackbarState) => void
  onClose?: () => void
}

export const BrandCreateModal: React.FC<BrandCreateModalProps> = ({ open, toggleSnackbar, onClose }) => {
  const refresh = useRefresh()
  const [isMutating, setIsMutating] = useState(false)
  const [createBrand] = useMutation(CREATE_BRAND, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Brand created",
        status: "success",
      })
      refresh()
      onClose?.()
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const onSubmit = async values => {
    setIsMutating(true)
    const { brandCode, brandTier, description, name, sinceDate, websiteURL } = values
    const sinceYear = sinceDate && new Date(sinceDate).getFullYear()
    const result = await createBrand({
      variables: {
        input: {
          brandCode: brandCode.toUpperCase(),
          description,
          name,
          since: sinceYear && new Date(sinceYear, 0, 1).toISOString(),
          slug: slugify(name).toLowerCase(),
          tier: brandTier,
          websiteUrl: websiteURL,
        },
      },
    })
    setIsMutating(false)
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
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Create brand
        </DialogTitle>
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => {
            return (
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
                        <TextField name="websiteURL" placeholder="Enter a url" optionalURL />
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
            )
          }}
        </Form>
      </Dialog>
    </>
  )
}
