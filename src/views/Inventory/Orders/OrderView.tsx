import { ComponentError } from "components"
import React from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"

import { Header } from "components"
import { Container, Box, Typography, Grid } from "@material-ui/core"
import { OrderInfo } from "./Components/OrderInfo"
import { OrderLineItemGrid } from "./Components/OrderLineItemGrid"

export const OrderView = ({ match }) => {
  const { orderID } = match.params
  // Get the data
  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "Order",
    payload: { id: orderID },
  })
  if (!loaded || loading) return <Loading />
  if (error || !data) return <ComponentError />

  return (
    <Container maxWidth={false}>
      <Header
        title={`Order: ${data.orderNumber}`}
        breadcrumbs={[
          {
            title: "Orders",
            url: "/inventory/orders",
          },
          {
            title: `Order: ${data.orderNumber}`,
            url: `/inventory/orders/${data.id}`,
          },
        ]}
        menuItems={[
          {
            text: "Update status",
            action: () => {
              // toggleUpdateStatusModal(true)
            },
          },
        ]}
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
