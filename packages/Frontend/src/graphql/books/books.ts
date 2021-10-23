import { gql } from "urql";
import { IBook } from "@dl/shared";

export interface IBooksQuery {
  books: Array<IBook>
}

export interface IBooksVariables {
  page: number
  limit: number
}


export const booksQuery = gql`
  query books($page: Int, $limit: Int) {
    books(page: $page, limit: $limit) {
      id
      title
      imageUrl
      description
    }
  }
`;
