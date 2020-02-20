import React from "react"
import { Edit, SimpleForm, DisabledInput, TextInput, ImageInput, ReferenceInput, SelectInput } from "react-admin"

export const ProductEdit = props => (
  <Edit title="Edit a product" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ImageInput
        source="images"
        label="Product Images"
        accept="image/*"
        multiple
        placeholder={<p>Drop your file here</p>}
      >
        <ProductImageField source="src" size="large" />
      </ImageInput>
      <TextInput source="name" />
      <TextInput source="description" />
      <ReferenceInput source="category.id" reference="Category">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="brand.id" reference="Brand">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductImageField: React.SFC<any> = ({ record, size = "large" }) => {
  const imageURL = record.thumbnails[size].url
  return <img src={imageURL} alt="" />
}
