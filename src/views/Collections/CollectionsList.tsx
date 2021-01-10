import React, { useState } from "react"
import { Datagrid, DateField, Filter, List, TextField, TextInput } from "@seasons/react-admin"
import { Header, Indicator, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { useHistory } from "react-router-dom"
import { ViewEntityField } from "fields"
import { collection } from "generated/collection"

export const CollectionsList = props => {
  const history = useHistory()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  return (
    <>
      <Header
        title="Collections"
        primaryButton={{
          text: "New Collection",
          action: () => history.push("/content/collections/new"),
        }}
        breadcrumbs={[
          {
            title: "Content",
            url: "/content",
          },
          {
            title: "Collections",
            url: "/content/collections",
          },
        ]}
      />
      <List
        {...props}
        exporter={false}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource="Collection"
        title="Collections"
      >
        <Datagrid>
          <TextField source="title" label="Title" />
          <DateField source="createdAt" label="CreatedAt" />
          <DateField source="updatedAt" label="UpdatedAt" />
          <PublishedField label="Published" />
          <ViewEntityField source="id" entityPath="content/collections" label="Actions" />
        </Datagrid>
      </List>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}

const PublishedField: React.FC<{ label: string; record?: collection }> = ({ label, record }) => {
  if (!record) {
    return null
  }

  return (
    <>
      <Indicator status={record.published} />
    </>
  )
}
