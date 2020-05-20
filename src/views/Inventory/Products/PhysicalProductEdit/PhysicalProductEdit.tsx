import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"

import { BackButton, Spacer, Wizard } from "components"
import { PhysicalProducts } from "../Components"
import { PhysicalProductEditQuery, PhysicalProductEditQuery_physicalProduct } from "generated/PhysicalProductEditQuery"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { PHYSICAL_PRODUCT_EDIT_QUERY } from "../queries"
import { getDateISOString, getLocaleDateString } from "../utils"

export interface PhysicalProductEditProps {}

export const PhysicalProductEdit: React.FC<PhysicalProductEditProps> = props => {
  const history = useHistory()
  const { physicalProductID } = useParams()
  const { data, loading, error } = useQuery(PHYSICAL_PRODUCT_EDIT_QUERY, {
    variables: { where: { id: physicalProductID } },
  })
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT)

  if (loading || !data) {
    return <Loading />
  }

  const { physicalProduct }: { physicalProduct: PhysicalProductEditQuery_physicalProduct } = data
  const { dateOrdered, dateReceived, inventoryStatus, productStatus, seasonsUID, unitCost } = physicalProduct
  const initialValues = {
    [`${seasonsUID}_dateOrdered`]: getLocaleDateString(dateOrdered) || undefined,
    [`${seasonsUID}_dateReceived`]: getLocaleDateString(dateReceived) || undefined,
    [`${seasonsUID}_inventoryStatus`]: inventoryStatus,
    [`${seasonsUID}_physicalProductStatus`]: productStatus,
    [`${seasonsUID}_unitCost`]: unitCost || undefined,
  }

  const onSubmit = async values => {
    const updatePhysicalProductData = {
      dateOrdered: getDateISOString(values[`${seasonsUID}_dateOrdered`]) || null,
      dateReceived: getDateISOString(values[`${seasonsUID}_dateReceived`]) || null,
      inventoryStatus: values[`${seasonsUID}_inventoryStatus`],
      productStatus: values[`${seasonsUID}_physicalProductStatus`],
      unitCost: parseFloat(values[`${seasonsUID}_unitCost`]) || null,
    }
    console.log("UPDATE:", updatePhysicalProductData)
    const result = await updatePhysicalProduct({
      variables: {
        where: { id: physicalProduct.id },
        data: updatePhysicalProductData,
      },
    })
    if (result?.data) {
      history.push(`/inventory/product/variants/${physicalProduct.productVariant.id}`)
    }
  }

  const physicalProductEditQueryData: PhysicalProductEditQuery = data

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton
        title={physicalProduct.seasonsUID}
        onClick={() => history.push(`/inventory/product/variants/${physicalProduct.productVariant.id}`)}
      />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <PhysicalProducts
          inventoryStatuses={physicalProductEditQueryData.inventoryStatuses?.enumValues || []}
          physicalProductStatuses={physicalProductEditQueryData.physicalProductStatuses?.enumValues || []}
          physicalProducts={[physicalProduct]}
        />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
