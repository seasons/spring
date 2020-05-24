import React from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { Header } from "components/Header"

export const CategoryList = props => (
  <>
    <Header
      title="Categories"
      primaryButton={{ text: "New Category" }}
      breadcrumbs={[
        {
          title: "Categories",
          url: "/categories",
        },
      ]}
    />
    <List
      {...props}
      perPage={10}
      hasCreate={false}
      hasEdit={false}
      hasList={true}
      hasShow={true}
      resource={"Category"}
      title="Categories"
    >
      <Datagrid>
        <TextField source="name" label="Name" />
      </Datagrid>
    </List>
  </>
)
