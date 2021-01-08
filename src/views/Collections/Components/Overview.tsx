import React from "react"
import { Grid } from "@material-ui/core"
import { SelectField, TextField } from "fields"
import { Header, ImageUpload, Spacer, Text } from "components"
import { ProductSearch } from "components/ProductSearch"
const publishedChoices = [
  { value: true, display: "True" },
  { value: false, display: "False" },
]

export const Overview: React.FC = () => {
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
              <TextField name="subTitle" placeholder="Optional tag line" requiredString />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Published</Text>
              <Spacer mt={1} />
              <SelectField name="status" choices={publishedChoices} initialValue={"false"} requiredString />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Text variant="h6">Products</Text>
              <Spacer mt={1} />
              <ProductSearch />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
