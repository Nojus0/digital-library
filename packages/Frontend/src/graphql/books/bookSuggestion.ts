import { gql } from "urql";
import { IBook } from "@dl/shared";

export interface IBookSuggestionQuery {
  bookSuggestion: Array<IBook>
}

export interface IBookSuggestionVars {
  search: string
}


export const bookSuggestionQuery = gql`
  query bookSuggestion($search: String!) {
    bookSuggestion(search: $search) {
      id
      name
      imageUrl
      description
    }
  }
`;
