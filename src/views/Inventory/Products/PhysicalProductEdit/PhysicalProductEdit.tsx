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

  let initialValues = {}
  const { physicalProduct } = data
  // const { id, internalSize, product, total, weight } = productVariant
  // if (internalSize) {
  //   const size = internalSize?.display
  //   switch (internalSize.productType) {
  //     case "Top":
  //       const { top } = internalSize
  //       initialValues = {
  //         [`${size}_chest`]: parseFloat(top?.chest) || undefined,
  //         [`${size}_length`]: parseFloat(top?.length) || undefined,
  //         [`${size}_neck`]: parseFloat(top?.neck) || undefined,
  //         [`${size}_shoulder`]: parseFloat(top?.shoulder) || undefined,
  //         [`${size}_sleeve`]: parseFloat(top?.sleeve) || undefined,
  //         [`${size}_totalcount`]: total,
  //         [`${size}_weight`]: parseFloat(weight) || undefined,
  //       }
  //       console.log("TOP", top)
  //       break
  //     case "Bottom":
  //       const { bottom } = internalSize
  //       initialValues = {
  //         [`${size}_waist`]: parseFloat(bottom?.waist) || undefined,
  //         [`${size}_rise`]: parseFloat(bottom?.rise) || undefined,
  //         [`${size}_hem`]: parseFloat(bottom?.hem) || undefined,
  //         [`${size}_inseam`]: parseFloat(bottom?.inseam) || undefined,
  //         [`${size}_totalcount`]: total,
  //         [`${size}_weight`]: parseFloat(weight) || undefined,
  //       }
  //       break
  //     default:
  //       break
  //   }
  // }

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
