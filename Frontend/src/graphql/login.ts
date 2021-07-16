import { gql } from "urql";

export const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            error
        }
    }
`;


