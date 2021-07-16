import { gql } from "urql";

export const bookQuery = gql`
  query book($id: Int!) {
    book(id: $id) {
      id
      name
      imageUrl
      description
    }
  }
`;
