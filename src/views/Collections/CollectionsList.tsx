import React, { useState } from "react"
import { Datagrid, DateField, List, TextField } from "@seasons/react-admin"
import { ViewEntityField } from "fields"
import { Header, Indicator, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { useHistory } from "react-router-dom"
// import { collection } from "generated/collection"
import { Box } from "@material-ui/core"

export const CollectionsList = props => {
  const history = useHistory()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  return (
    <Box px={2}>
      <Header
        title="Collections"
        primaryButton={{
          text: "New Collection",
          action: () => history.push("/content/collections/create"),
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
    </Box>
  )
}

const PublishedField: React.FC<{ label: string; record?: any }> = ({ label, record }) => {
  if (!record) {
    return null
  }
  return <Indicator status={record.published ? "True" : "False"} />
}
