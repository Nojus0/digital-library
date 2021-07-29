import { gql, useQuery, UseQueryArgs } from "urql";

// export function useCurrentUserQuery(args?: UseQueryArgs<object, ICurrentUser>) {
//   return useQuery<ICurrentUser>({ ...args, query: currentUserQuery, });
// }


export interface ICurrentUser {
  currentUser: {
    username: string,
    role: string
  }
}

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      username
      role
    }
  }
`;
