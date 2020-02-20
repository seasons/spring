import React from "react"
import { graphql } from "react-apollo"
import styled from "styled-components"
import { AutocompleteInput, Create, SimpleForm, SelectArrayInput, TextInput, ImageInput } from "react-admin"
import { productCreateQuery } from "../../Queries"

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props.data
  return (
    <Create title="Create a Product" {...props}>
      <SimpleForm>
        <ImageInput
          source="images"
          label="Product Images"
          accept="image/*"
          multiple
          placeholder={<p>Drop your file here</p>}
        >
          <ProductImagePreview source="src" />
        </ImageInput>
        <TextInput source="name" />
        <AutocompleteInput source="brand" choices={data.brands} />
        <TextInput source="description" options={{ multiLine: true }} />
        <SelectArrayInput
          label="Available Sizes"
          source="availableSizes"
          choices={[
            { id: "XS", name: "XS" },
            { id: "S", name: "S" },
            { id: "M", name: "M" },
            { id: "L", name: "L" },
            { id: "XL", name: "XL" },
          ]}
        />
        <SelectArrayInput label="Available Colors" source="availableColors" choices={data.colors} />
      </SimpleForm>
    </Create>
  )
})

const ProductImagePreview: React.SFC<any> = ({ record }) => {
  if (record.rawFile) {
    return (
      <ImageContainer>
        <img src={record.rawFile.preview} alt="" />
      </ImageContainer>
    )
  }

  return null
}

const ImageContainer = styled.div`
  width: 300px;
  img {
    width: inherit;
  }
`
