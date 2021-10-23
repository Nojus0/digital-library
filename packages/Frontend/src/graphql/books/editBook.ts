import { IBook } from "@dl/shared";
import { gql } from "@urql/core";

export interface IEditBookVars {
    bookId: number,
    newTitle: string,
    newDescription: string
}

export interface IEditBook {
  editBook: IBook
}

export const editBookMutation = gql`
mutation editBook($bookId: Int!, $newTitle: String!, $newDescription: String!) {
  editBook(
    bookId: $bookId
    newTitle: $newTitle
    newDescription: $newDescription
  ) {
    id
    title
    description
  }
}

`

export const editBookMutationCompact = gql`
mutation editBook($bookId: Int!, $newTitle: String!, $newDescription: String!) {
  editBook(
    bookId: $bookId
    newTitle: $newTitle
    newDescription: $newDescription
  ) {
    id
  }
}

`