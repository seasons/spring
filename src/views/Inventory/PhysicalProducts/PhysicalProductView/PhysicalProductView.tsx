import { Box, Typography, Divider } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Loading, useRefresh } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { Spacer, Text, Wizard, Header, Snackbar } from "components"

import { PHYSICAL_PRODUCT_VIEW_QUERY } from "../queries"
import { getLocaleDateString, getDateISOString } from "views/Inventory/Products/utils"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { PhysicalProductForm, OffloadPhysicalProductModal, PickPhysicalProductModal } from "../Components"
import { SnackbarState } from "components/Snackbar"


export interface PhysicalProductViewProps {}

export const PhysicalProductView: React.FC<PhysicalProductViewProps> = () => {
  const history = useHistory()
  const refresh = useRefresh()
  const { physicalProductID } = useParams()
  const [openOffloadModal, setOpenOffloadModal] = useState(false)
  const [openPickModal, setOpenPickModal] = useState(false)
  const { data, loading, error } = useQuery(PHYSICAL_PRODUCT_VIEW_QUERY, {
    variables: { where: { id: physicalProductID } },
  })
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    refetchQueries: [
      {
        query: PHYSICAL_PRODUCT_VIEW_QUERY,
        variables: { where: { id: physicalProductID } },
      },
    ],
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Physical Product updated",
        status: "success",
      })
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  // added necessary code for surfacing error snackbar

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })


  if (loading || error || !data) {
    return <Loading />
  }

  const { physicalProduct }: { physicalProduct } = data
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

  const { warehouseLocation } = data.physicalProduct as any

  const breadcrumbs = [
    {
      title: "Physical products",
      url: "/inventory/physicalproducts",
    },
  ]

  const menuItems = [
    {
      text: "Pick",
      action: async () => setOpenPickModal(true),
    },
  ] as any

  if (physicalProduct.inventoryStatus !== "Offloaded") {
    menuItems.push({
      text: "Offload",
      action: async () => setOpenOffloadModal(true),
    })
  }

  const productVariant = data?.physicalProduct?.productVariant
  const uid = data?.physicalProduct?.seasonsUID
  const inventoryStatuses = data?.inventoryStatuses?.enumValues
  const statuses = data?.physicalProductStatuses?.enumValues

  const onCloseOffloadModal = () => {
    setOpenOffloadModal(false)
    refresh()
  }

  const onClosePickModal = () => {
    setOpenPickModal(false)
    refresh()
  }

  if (productVariant) {
    const { product } = productVariant
    breadcrumbs.push({
      title: product.name,
      url: `/inventory/products/${product.id}`,
    })
    breadcrumbs.push({
      title: productVariant.sku || "",
      url: `/inventory/product/variants/${productVariant.id}`,
    })
    breadcrumbs.push({
      title: uid,
      url: `/inventory/product/variants/physicalProducts/${data?.physicalProduct.id}`,
    })
  }

  return (
    <Box mx={5} display="flex" flexDirection="column">
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Box>
          <Header
            title="Physical product edit"
            subtitle="Edit physical product data"
            breadcrumbs={breadcrumbs}
            menuItems={menuItems}
          />
          <PhysicalProductForm inventoryStatuses={inventoryStatuses} statuses={statuses} uid={uid} />
        </Box>
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
      <Spacer mt={9} />
      {openOffloadModal && (
        <OffloadPhysicalProductModal
          open={openOffloadModal}
          onClose={onCloseOffloadModal}
          physicalProduct={physicalProduct as any}
        />
      )}
      {openPickModal && (
        <PickPhysicalProductModal
          open={openPickModal}
          onClose={onClosePickModal}
          physicalProduct={physicalProduct as any}
        />
      )}
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
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
