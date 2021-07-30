import { gql, useMutation } from "urql";

export interface ILogin {
    login: {
        user?: {
            username: string,
            role: string
        },
        error?: string
    }
}
export interface ILoginVariables {
    email: string,
    password: string
}

export const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                username
                role
            }
            error
        }
    }
`;


