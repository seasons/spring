import { Box } from "@material-ui/core"
import React from "react"
import { useQuery, useMutation } from "react-apollo"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_CREATE_QUERY } from "../queries"
import { UPLOAD_FILE } from "../mutations"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = props => {
  const { data, loading } = useQuery(PRODUCT_CREATE_QUERY)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  if (
    loading ||
    !data?.bottomSizes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    // !data?.materials ||
    !data?.physicalProductStatuses ||
    !data?.products ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return <div>Loading</div>
  }
  console.log("DATA:", data)

  const onSubmit = async values => {
    console.log("SUBMITTED VALUES FINAL:", values)
    const imageFile = values["image_0"]
    console.log("UPLOADING:", imageFile)
    const result = await uploadFile({
      variables: {
        image: imageFile,
      },
    })
    console.log("RESULT:", result)
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  return (
    <Box>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} />
        <Variants />
        <PhysicalProducts data={data} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
