import { IBook, IUser } from "@dl/shared";
import { gql } from "urql";


export interface ISearchBarQuery {
  userProfile: IUser
  bookSuggestion: Array<IBook>
}

export interface ISearchBarVars {
  search: string
}

export const searchBarQuery = gql`
  query searchBar($search: String!) {
    userProfile(username: $search) {
      username
      role
    }
    bookSuggestion(search: $search) {
      id
      title
      imageUrl
      description
    }
  }
`;

