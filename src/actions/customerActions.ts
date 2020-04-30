export const CUSTOMER_UPDATE = "CUSTOM_QUERY_SUCCESS"

export const updateCustomer = data => {
  return {
    type: CUSTOMER_UPDATE,
    payload: { data: data },
    requestPayload: {
      id: data.id,
    },
    meta: {
      resource: "Customer",
      fetchResponse: "GET_ONE",
      fetchStatus: "RA/FETCH_END",
    },
  }
}
