import { gql } from "urql";
import { IBook } from "@dl/shared";

export interface IBookQuery {
  book: IBook
}

export interface IBookVariables {
  id: number
}

export const bookQuery = gql`
  query book($id: Int!) {
    book(id: $id) {
      id
      name
      imageUrl
      description
    }
  }
`;
