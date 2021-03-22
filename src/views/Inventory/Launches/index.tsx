import React from "react"
import { useHistory } from "react-router-dom"
import { Datagrid, List, TextField, DateField } from "@seasons/react-admin"
import { Header } from "components/Header"
import { ViewEntityField } from "fields"

export const LaunchList = props => {
  const history = useHistory()
  return (
    <>
      <Header
        title="Launches"
        primaryButton={{ text: "New Launch", action: () => history.push("/inventory/launches/new") }}
      />
      <List
        {...props}
        exporter={false}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource={"Launch"}
        title="Launches"
      >
        <Datagrid>
          <TextField source="name" label="Name" />
          <DateField source="launchAt" label="CreatedAt" />
          <ViewEntityField source="id" entityPath="inventory/launches" label="Actions" />
        </Datagrid>
      </List>
    </>
  )
}
