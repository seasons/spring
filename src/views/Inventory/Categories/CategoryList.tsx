import React from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { Header } from "components/Header"
import { useHistory } from "react-router"
import { CheckField, ViewEntityField } from "fields"

export const CategoryList = props => {
  const history = useHistory()

  return (
    <>
      <Header
        title="Categories"
        primaryButton={{ text: "New Category", action: () => history.push("/inventory/categories/new") }}
      />
      <List
        {...props}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource={"Category"}
        title="Categories"
      >
        <Datagrid>
          <TextField source="name" label="Name" />
          <TextField source="recoupment" label="Recoupment" />
          <TextField source="dryCleaningFee" label="Cleaning fee" />
          <TextField source="name" label="Name" />
          <CheckField source="visible" value={true} />
          <ViewEntityField source="id" entityPath="inventory/categories" label="Actions" />
        </Datagrid>
      </List>
    </>
  )
}
