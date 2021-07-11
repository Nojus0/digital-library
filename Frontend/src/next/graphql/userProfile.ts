import { gql } from "urql";

export const userProfileQuery = gql`
  query userProfile($username: String!) {
    userProfile(username: $username) {
      username
      role
      borowing {
        id
        name
        imageUrl
        description
      }
    }
  }
`;
