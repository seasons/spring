import { Box, Typography, Divider } from "@material-ui/core"
import React from "react"

import { useMutation } from "react-apollo"
import { Spacer, Text, Wizard } from "components"

import { PHYSICAL_PRODUCT_VIEW_QUERY } from "../queries"
import { getLocaleDateString, getDateISOString } from "views/Inventory/Products/utils"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { PhysicalProductForm } from "../Components"
import { TabRenderProps } from "components/DetailView"
import { useSnackbarContext } from "components/Snackbar"

export const ManageView: React.FC<TabRenderProps> = ({ data }) => {
  const {
    id: physicalProductID,
    dateOrdered,
    dateReceived,
    inventoryStatus,
    productStatus,
    offloadMethod,
    seasonsUID,
    unitCost,
    warehouseLocation,
  } = data

  const { showSnackbar } = useSnackbarContext()
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    refetchQueries: [
      {
        query: PHYSICAL_PRODUCT_VIEW_QUERY,
        variables: { where: { id: physicalProductID } },
      },
    ],
    onCompleted: () => {
      showSnackbar({
        message: "Physical Product updated",
        status: "success",
      })
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })

  const onSubmit = async values => {
    const updatePhysicalProductData = {
      dateOrdered: getDateISOString(values[`${seasonsUID}_dateOrdered`]) || null,
      dateReceived: getDateISOString(values[`${seasonsUID}_dateReceived`]) || null,
      inventoryStatus: values[`${seasonsUID}_inventoryStatus`],
      productStatus: values[`${seasonsUID}_physicalProductStatus`],
      offloadMethod: values[`${seasonsUID}_offloadMethod`],
      unitCost: parseFloat(values[`${seasonsUID}_unitCost`]) || null,
    }
    await updatePhysicalProduct({
      variables: {
        where: { id: physicalProductID },
        data: updatePhysicalProductData,
      },
    })
  }

  const initialValues = {
    [`${seasonsUID}_dateOrdered`]: getLocaleDateString(dateOrdered) || undefined,
    [`${seasonsUID}_dateReceived`]: getLocaleDateString(dateReceived) || undefined,
    [`${seasonsUID}_inventoryStatus`]: inventoryStatus,
    [`${seasonsUID}_physicalProductStatus`]: productStatus,
    [`${seasonsUID}_offloadMethod`]: offloadMethod,
    [`${seasonsUID}_unitCost`]: unitCost || undefined,
  }

  return (
    <Box mx={5} display="flex" flexDirection="column">
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Box>
          <PhysicalProductForm uid={seasonsUID} currentInventoryStatus={inventoryStatus} />
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
    </Box>
  )
}
