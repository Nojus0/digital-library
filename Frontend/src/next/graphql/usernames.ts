import { gql } from "urql";

export const usernamesQuery = gql`
  query {
    usernames
  }
`;
