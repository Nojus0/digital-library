import { gql } from "urql";

export const bookIdsQuery = gql`
  query {
    bookIds
  }
`;
