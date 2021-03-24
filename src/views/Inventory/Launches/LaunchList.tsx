import React from "react"
import { useHistory } from "react-router-dom"
import { Datagrid, List, TextField, DateField } from "@seasons/react-admin"
import { Header } from "components/Header"
import { ViewEntityField } from "fields"

export const LaunchList = props => {
  const history = useHistory()
  console.log("props", props)
  return (
    <>
      <Header
        title="Launches"
        primaryButton={{ text: "New Launch", action: () => history.push("/inventory/launches/new") }}
      />
      <List
        {...props}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        sort={{ field: "launchAt", order: "DESC" }}
        resource="Launch"
        title="Launches"
      >
        <Datagrid>
          <TextField source="brand.name" label="Brand" />
          <TextField source="collection.title" label="Collection" />
          <DateField source="launchAt" label="launchAt" />
          <ViewEntityField source="id" entityPath="inventory/launches" label="Actions" />
        </Datagrid>
      </List>
    </>
  )
}
