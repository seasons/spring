import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { PhysicalProducts } from "../Components"
import { PHYSICAL_PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_VARIANT } from "../mutations"
import { extractVariantSizeFields } from "../utils"

export interface PhysicalProductEditProps {}

export const PhysicalProductEdit: React.FC<PhysicalProductEditProps> = props => {
  const history = useHistory()
  const { physicalProductID } = useParams()
  const { data, loading, error } = useQuery(PHYSICAL_PRODUCT_EDIT_QUERY, {
    variables: { where: { id: physicalProductID } },
  })

  if (error) {
    console.log("ERROR", error)
  }

  if (loading || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  const { physicalProduct } = data
  const { dateOrdered, dateReceived, inventoryStatus, productStatus, seasonsUID, unitCost } = physicalProduct
  const initialValues = {
    [`${seasonsUID}_dateOrdered`]: dateOrdered || undefined,
    [`${seasonsUID}_dateReceived`]: dateReceived || undefined,
    [`${seasonsUID}_inventoryStatus`]: inventoryStatus,
    [`${seasonsUID}_physicalProductStatus`]: productStatus,
    [`${seasonsUID}_unitCost`]: unitCost || undefined,
  }

  const onSubmit = async values => {}

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton
        title={physicalProduct.seasonsUID}
        onClick={() => history.push(`/inventory/product/variants/${physicalProduct.productVariant.id}`)}
      />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <PhysicalProducts
          inventoryStatuses={data.inventoryStatuses}
          physicalProductStatuses={data.physicalProductStatuses}
          physicalProducts={[physicalProduct]}
        />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
