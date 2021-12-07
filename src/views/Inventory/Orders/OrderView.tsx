import { ComponentError } from "components"
import React from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"

import { Header } from "components"
import { Container, Box, Typography, Grid } from "@material-ui/core"
import { OrderInfo } from "./Components/OrderInfo"
import { OrderLineItemGrid } from "./Components/OrderLineItemGrid"
import { useRefresh } from "@seasons/react-admin"
import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { useSnackbarContext } from "components/Snackbar"
import { Order } from "generated/Order"

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

  const { data, loading, loaded, error } = useQueryWithStore<Order>({
    type: "getOne",
    resource: "Order",
    payload: { id: orderID },
  })
  const { showSnackbar } = useSnackbarContext()
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      showSnackbar({
        message: "Order status updated",
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

  if (!loaded || loading) return <Loading />
  if (error || !data) return <ComponentError />

  const isOrderFulfilled = data.status === "Fulfilled"

  let primaryButton = () => {
    if (!isOrderFulfilled && data.status !== "Drafted") {
      return {
        text: "Mark as Fulfilled",
        action: async () => {
          await updateOrderStatus({
            variables: { orderID, status: "Fulfilled" },
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
    </Container>
  )
}
