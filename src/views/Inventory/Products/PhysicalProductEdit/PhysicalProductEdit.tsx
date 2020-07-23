import { Box, Typography, Divider } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"

import { Spacer, Text, Wizard } from "components"
import { PhysicalProducts } from "../Components"
import { OffloadPhysicalProductModal } from "./Components"
import { PhysicalProductEditQuery, PhysicalProductEditQuery_physicalProduct } from "generated/PhysicalProductEditQuery"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { PHYSICAL_PRODUCT_EDIT_QUERY } from "../queries"
import { getDateISOString, getLocaleDateString } from "../utils"
import { colors } from "theme/colors"

export interface PhysicalProductEditProps {}

export const PhysicalProductEdit: React.FC<PhysicalProductEditProps> = props => {
  const history = useHistory()
  const { physicalProductID } = useParams()
  const { data, loading, error } = useQuery(PHYSICAL_PRODUCT_EDIT_QUERY, {
    variables: { where: { id: physicalProductID } },
  })
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT)
  const [openOffloadPhysicalProductModal, setOpenOffloadPhysicalProductModal] = useState(false)

  if (loading || error || !data) {
    return <Loading />
  }

  const onCloseOffloadPhysicalProductModal = () => {
    setOpenOffloadPhysicalProductModal(false)
    history.push(`/inventory/product/variants/${physicalProduct.productVariant.id}`)
  }

  const onClickOffloadPhysicalProduct = () => {
    setOpenOffloadPhysicalProductModal(true)
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
  console.log(physicalProductEditQueryData)
  const { warehouseLocation } = physicalProductEditQueryData.physicalProduct as any

  return (
    <Box mx={5} display="flex" flexDirection="column">
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <PhysicalProducts
          inventoryStatuses={physicalProductEditQueryData.inventoryStatuses?.enumValues || []}
          physicalProductStatuses={physicalProductEditQueryData.physicalProductStatuses?.enumValues || []}
          physicalProducts={[physicalProduct]}
        />
      </Wizard>
      <Box display="flex" flexDirection="column" mb={2}>
        <Text variant="h5">Warehouse Location *</Text>
        <Box display="flex" flexDirection="row" ml={0}>
          <Box mr={1} mt={1} flexDirection="column">
            <Typography variant="body1" color="textSecondary">
              Type
            </Typography>
            <Typography variant="h3" color="textSecondary">
              {warehouseLocation?.type || "-"}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box m={1} flexDirection="column">
            <Typography variant="body1" color="textSecondary">
              Location
            </Typography>
            <Typography variant="h3" color="textSecondary">
              {warehouseLocation?.locationCode || "-"}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box m={1} flexDirection="column">
            <Typography variant="body1" color="textSecondary">
              Item
            </Typography>
            <Typography variant="h3" color="textSecondary">
              {warehouseLocation?.itemCode || "-"}
            </Typography>
          </Box>
        </Box>
      </Box>
      {physicalProduct.inventoryStatus !== "Offloaded" && (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={10}
            px={2}
            py={1}
            width={50}
            bgcolor={colors.black100}
            style={{ cursor: "pointer" }}
            onClick={onClickOffloadPhysicalProduct}
          >
            <Text variant="h6" color={colors.white100}>
              Offload
            </Text>
          </Box>
          <Spacer mt={5} />
        </>
      )}
      <Spacer mt={9} />
      {openOffloadPhysicalProductModal && physicalProduct && (
        <OffloadPhysicalProductModal
          open={openOffloadPhysicalProductModal}
          onClose={onCloseOffloadPhysicalProductModal}
          physicalProduct={physicalProduct as any}
        />
      )}
    </Box>
  )
}

export const ActionBox = muiStyled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  cursor: "pointer",
})
