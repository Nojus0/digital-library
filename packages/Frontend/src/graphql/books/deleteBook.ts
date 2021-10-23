import { gql } from "urql";
import { client } from "../client";

export async function deleteBook(id: number) {
    const resp = await client.mutation<IDeleteBook, IDeleteBookVars>(deleteBookMutation, { id })
        .toPromise();

    return [
        resp?.data?.deleteBook,
        resp.error
    ]
}

export interface IDeleteBook {
    deleteBook: boolean
}

export interface IDeleteBookVars {
    id: number
}

export const deleteBookMutation = gql`
mutation deleteBook($id: Int!) {
  deleteBook(id: $id)
}
`;
