import { Header } from "components/Header"
import { FullNameField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, List, TextField } from "react-admin"

import { Container, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { CustomerFilter } from "./CustomerFilter"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
}))

const createNewMember = () => {
  // history.push("/product/new")
  console.log("yep new member coming ip")
}

export const CustomerList = props => {
  const classes = useStyles()
  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header title="Members" newEntityText="New Customer" newEntityHandler={createNewMember} />
        <List
          {...props}
          filters={<CustomerFilter />}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          resource={"Customer"}
          title="Customers"
        >
          <Datagrid>
            <FullNameField label="Name" />
            <TextField source="detail.shippingAddress.city" label="City" />
            <TextField source="detail.shippingAddress.state" label="State" />
            <TextField source="plan" label="Membership" />
            <TextField source="status" label="Status" />
            <TextField source="bagItems.id" label="Money Spent" />
            <TextField source="bagItems.id" label="Current Items" />
            <ViewEntityField entityPath="members" source="user.id" label="Actions" />
          </Datagrid>
        </List>
      </Container>
    </>
  )
}
