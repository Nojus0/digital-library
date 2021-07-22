import { gql, useMutation } from "urql";

export function useRegisterMutation() {
    return useMutation(registerMutation);
}

export interface IRegister {
    register: {
        user: {
            username: string,
            role: string
        },
        error: string
    }
}

export interface IRegisterVariables {
    email: string,
    password: string,
    username: string
}

export const registerMutation = gql`
    mutation register($email: String!, $password: String!, $username: String!) {
        register(email: $email, password: $password, username: $username) {
            user {
                username
                role
            }
            error
        }
    }
`;
