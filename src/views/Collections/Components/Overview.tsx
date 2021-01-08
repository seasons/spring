import React from "react"
import { Grid } from "@material-ui/core"
import { SelectField, TextField } from "fields"
import { Header, ImageUpload, Spacer, Text } from "components"
import { ProductSearch } from "components/ProductSearch"
import { ProductSelects } from "components/ProductSelects"
const publishedChoices = [
  { value: true, display: "True" },
  { value: false, display: "False" },
]

export const Overview: React.FC<{
  selectedProducts: any[]
  setSelectedProducts: (products: any[]) => void
  collection?: any
}> = ({ selectedProducts, setSelectedProducts, collection }) => {
  return (
    <>
      <Header
        title="New collection"
        subtitle="Create a collection of products."
        breadcrumbs={[
          {
            title: "Content",
            url: "/content",
          },
          {
            title: "Collections",
            url: "/content/collections",
          },
          {
            title: "New collection",
            url: "/content/collections/create",
          },
        ]}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ImageUpload numImages={4} title="Images" />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Title</Text>
              <Spacer mt={1} />
              <TextField name="title" placeholder="Holiday" requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Subtitle</Text>
              <Spacer mt={1} />
              <TextField name="subTitle" placeholder="Optional tag line" />
            </Grid>
            <Grid item xs={12}>
              <Text variant="h6">Description</Text>
              <Spacer mt={1} />
              <TextField multiline name="description" placeholder="Description" requiredString />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Published</Text>
              <Spacer mt={1} />
              <SelectField
                name="status"
                choices={publishedChoices}
                initialValue={collection?.published || false}
                requiredString
              />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Product search</Text>
              <Spacer mt={1} />
              <ProductSearch selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Selected products</Text>
              <Spacer mt={1} />
              <ProductSelects selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
