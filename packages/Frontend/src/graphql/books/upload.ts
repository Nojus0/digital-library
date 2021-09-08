import { gql } from "urql";

export interface IUploadMutation {
  upload: string
}

export interface IUploadVariables {
  title: string,
  description: string
  addPhoto: boolean
}

export const uploadMutation = gql`
mutation upload($title: String!, $description: String!, $addPhoto: Boolean!) {
    upload(title: $title, description: $description, addPhoto: $addPhoto)
}
`;
