import { gql, useMutation } from "urql";

export function useSignOutMutation() {
    return useMutation<ISignout>(signoutMutation);
}

export interface ISignout {
    signOut: boolean
}

export const signoutMutation = gql`
    mutation {
        signOut
    }
`;




