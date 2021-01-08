import { Header } from "components/Header"
import { SinceDateField, ImageField, ViewEntityField } from "fields"
import React, { useState } from "react"
import { Datagrid, List } from "@seasons/react-admin"

import { Container, Box, Button, colors } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { fitPic } from "generated/fitPic"
import { Indicator, Snackbar } from "components"
import { FitPicReportStatus } from "generated/globalTypes"

import { useRefresh } from "@seasons/react-admin"
import { useMutation } from "react-apollo"
import { get } from "lodash"
import { SnackbarState } from "components/Snackbar"

export const CollectionsList: React.FC<{ history: any }> = props => {
  const refresh = useRefresh()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  console.log("true")

  return (
    <Container maxWidth={false}>
      <Header
        title="Collections"
        primaryButton={{ text: "Create collection", action: () => props.history.push("/content/collections/create") }}
        breadcrumbs={[
          {
            title: "Content",
            url: "/content",
          },
          {
            title: "Collection",
            url: "/content/collections",
          },
        ]}
      />
      <List
        {...props}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        sort={{ field: "createdAt", order: "DESC" }}
        bulkActionButtons={[]}
      >
        <Datagrid>
          <GeneralField source="title" label="Title" />
        </Datagrid>
      </List>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}

const GeneralField: React.FC<{ label: string; record?: fitPic; source: string }> = ({ label, record, source }) => (
  <div>{`${get(record, source)}`}</div>
)

const PublishButton: React.FC<{ onClick: () => void; record: fitPic }> = ({ onClick, record }) => (
  <Box component="span" mr={1}>
    <Button size="small" variant="contained" color="secondary" onClick={onClick}>
      Publish
    </Button>
  </Box>
)

const ActionsField: React.FC<{ label: string; onPublish: (id: string) => void; record?: fitPic }> = ({
  label,
  onPublish,
  record,
}) => (
  <>
    {record && record.status !== "Published" && <PublishButton onClick={() => onPublish(record.id)} record={record} />}
    <ViewEntityField entityPath="content/collection" record={record} source="id" />
  </>
)

const ReportsField: React.FC<{ label: string; record?: fitPic }> = ({ label, record }) => {
  if (!record) {
    return null
  }

  const pendingReports = record.reports?.filter(report => report.status === FitPicReportStatus.Pending)
  if (pendingReports.length > 0) {
    return (
      <Box display="flex" alignItems="center" m="0 auto">
        <CloseIcon style={{ color: colors.red[500] }} />
      </Box>
    )
  } else {
    return null
  }
}

const StatusField: React.FC<{ label: string; record?: fitPic }> = ({ label, record }) => {
  if (!record) {
    return null
  }

  return (
    <>
      <Indicator status={record.status} />
      <Box ml={1} style={{ display: "inline-block" }}>
        {record.status}
      </Box>
    </>
  )
}
