import React from "react"
import { Header } from "components"
import { Grid } from "@material-ui/core"
import { ImagesSection } from "./ImagesSection"
import { GeneralSection } from "./GeneralSection"

export const Overview: React.FC = () => {
  return (
    <>
      <Header
        title="New post"
        subtitle="Please fill out all required fields"
        breadcrumbs={[
          {
            title: "Community",
            url: "/content/community",
          },
          {
            title: "New post",
            url: "/content/community/create",
          },
        ]}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ImagesSection />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection />
        </Grid>
      </Grid>
    </>
  )
}
