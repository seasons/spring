import React from "react"
import { Grid } from "@material-ui/core"
import { SelectField, TextField } from "fields"
import { Header, ImageUpload, Spacer, Text } from "components"
import { ProductSearch } from "components/ProductSearch"
import { ProductSelects } from "components/ProductSelects"
import { useLocation } from "react-router-dom"

const trueOrFalseSelectFields = [
  { display: "True", value: true },
  { display: "False", value: false },
]

export const Overview: React.FC<{
  selectedProductIDs: string[]
  products: any[]
  setSelectedProductIDs: (id: string[]) => void
  headerTitle: string
}> = ({ selectedProductIDs, setSelectedProductIDs, headerTitle, products }) => {
  const location = useLocation()
  return (
    <>
      <Header
        title={headerTitle}
        subtitle="A collection is a group of products that tell a story"
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
            title: headerTitle,
            url: location.pathname,
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
              <TextField name="title" requiredString />
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
              <SelectField name="published" choices={trueOrFalseSelectFields} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Product search</Text>
              <Spacer mt={1} />
              <ProductSearch selectedProductIDs={selectedProductIDs} setSelectedProductIDs={setSelectedProductIDs} />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Text variant="h6">Selected products</Text>
              <Spacer mt={1} />
              <ProductSelects
                products={products}
                selectedProductIDs={selectedProductIDs}
                setSelectedProductIDs={setSelectedProductIDs}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
