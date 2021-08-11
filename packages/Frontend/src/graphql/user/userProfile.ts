import { IUser } from "@dl/shared";
import { gql } from "urql";


export interface IUserProfileQuery {
  userProfile: IUser
}

export interface IUserProfileVariables {
  username: string
}

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

