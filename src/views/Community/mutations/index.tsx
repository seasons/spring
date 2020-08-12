import gql from "graphql-tag"

export const UPDATE_FIT_PIC = gql`
  mutation UpdateFitPic($id: ID!, $data: FitPicUpdateInput!) {
    updateFitPic(id: $id, data: $data)
  }
`

export const SUBMIT_FIT_PIC = gql`
  mutation SubmitFitPic($image: Upload!, $location: LocationCreateOneInput) {
    submitFitPic(image: $image, location: $location)
  }
`

export const DELETE_FIT_PIC = gql`
  mutation DeleteFitPic($id: ID!) {
    deleteFitPic(id: $id)
  }
`
