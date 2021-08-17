import { gql, useQuery, UseQueryArgs } from "urql";

export interface manageUser {
    username: string
    add: number[]
    remove: number[]
}

export interface IManageUsers {
    manageUsers: manageUser[]
}

export interface IManageUsersVars {
    users: manageUser[]
}

export const ManageUsersMutation = gql`
mutation manageUsers($users: [IManageUser!]!) {
  manageUsers(users: $users) {
    username
  }
}
`;
