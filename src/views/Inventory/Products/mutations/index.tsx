import gql from "graphql-tag"

export const UPLOAD_FILE = gql`
  mutation($image: Upload!) {
    uploadImage(image: $image)
  }
`
