import { ComponentError } from "components"
import React, { useState } from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"

import { Header } from "components"
import { Container, Box, Typography, Grid } from "@material-ui/core"
import { OrderInfo } from "./Components/OrderInfo"
import { OrderLineItemGrid } from "./Components/OrderLineItemGrid"
import { useRefresh } from "@seasons/react-admin"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"
import { Snackbar, SnackbarState } from "components/Snackbar"

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderID: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderID: $orderID, status: $status) {
      id
      status
    }
  }
`

export const OrderView = ({ match }) => {
  const { orderID } = match.params
  const refresh = useRefresh()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "Order",
    payload: { id: orderID },
  })
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Order status updated",
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

  if (!loaded || loading) return <Loading />
  if (error || !data) return <ComponentError />

  const isOrderFulfilled = data.status === "Fullfilled"

  let primaryButton = () => {
    if (!isOrderFulfilled && data.status !== "Drafted") {
      return {
        text: "Mark as Fullfilled",
        action: async () => {
          await updateOrderStatus({
            variables: { orderID, status: "Fullfilled" },
          })
          refresh()
        },
      }
    }

    return null
  }

  return (
    <Container maxWidth={false}>
      <Header
        title={`Order: ${data.orderNumber}`}
        breadcrumbs={[
          {
            title: "Orders",
            url: "/orders",
          },
          {
            title: `Order: ${data.orderNumber}`,
            url: `/orders/${data.id}`,
          },
        ]}
        primaryButton={primaryButton()}
      />
      <Box>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <Box mt={1} mb={2}>
              <Typography variant="h3">Info</Typography>
            </Box>
            <OrderInfo order={data} />
          </Grid>
          <Grid item sm={12} md={9}>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={2}>
              <Typography variant="h3">Line Items</Typography>
            </Box>
            <Box mb={4}>
              <Grid container spacing={2}>
                <OrderLineItemGrid lineItems={data.lineItems} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
