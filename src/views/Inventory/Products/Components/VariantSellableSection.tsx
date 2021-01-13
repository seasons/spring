import React from "react"
import { Text, Spacer } from "components"
import { Grid } from "@material-ui/core"
import { TextField, CheckboxField } from "fields"

type Props = {
  isEditing: boolean
  sellable: {
    new: boolean
    newPrice: number | null
    used: boolean
    usedPrice: number | null
  }
  size: string | null
}

export const VariantSellableSection: React.FC<Props> = ({ isEditing, sellable, size }) => {
  return (
    <>
      <Grid item xs={3} direction="row" alignItems="center" container>
        <Text variant="h5">Sellable New</Text>
        <CheckboxField
          name={`${size}_sellableNew`}
          disabled={isEditing}
          initialValue={sellable?.new}
          inputProps={{
            title: "Edit the physical product to update sellable new status.",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Text variant="h5">Sellable New Price</Text>
        <Spacer mt={1} />
        <TextField
          name={`${size}_sellableNewPrice`}
          type="number"
          optionalNumber
          disabled={isEditing}
          value={sellable?.newPrice}
          inputProps={{
            title: "Edit the physical product to update sellable new price.",
          }}
        />
      </Grid>
      <Spacer grid mt={5} />
      <Grid item xs={3} direction="row" alignItems="center" container>
        <Text variant="h5">Sellable Used</Text>
        <CheckboxField
          name={`${size}_sellableUsed`}
          disabled={isEditing}
          initialValue={sellable?.used}
          inputProps={{
            title: "Edit the physical product to update sellable used status.",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Text variant="h5">Sellable Used Price</Text>
        <Spacer mt={1} />
        <TextField
          name={`${size}_sellableUsedPrice`}
          type="number"
          optionalNumber
          disabled={isEditing}
          value={sellable?.usedPrice}
          inputProps={{
            title: "Edit the physical product to update sellable used price.",
          }}
        />
      </Grid>
    </>
  )
}
