import { makeAutoObservable } from "mobx";
import { IBook, IUser} from "@dl/shared";
import { client } from "src/graphql/client";
import {
  bookSuggestionQuery,
  IBookSuggestionQuery,
  IBookSuggestionVars,
} from "src/graphql/books/bookSuggestion";
import {
  ISearchBarQuery,
  ISearchBarVars,
  searchBarQuery,
} from "src/graphql/user/searchBar";

class SearchBarStore {
  value: string = "";
  show: boolean = false;
  bookResults: Array<IBook> = [];
  userResult: { username: string; role: string } = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearResults() {
    this.bookResults = [];
  }

  setValue(val: string) {
    this.setShow(true);
    this.value = val;
  }

  async fetchSuggestions() {
    try {
      const resp = await client
        .query<ISearchBarQuery, ISearchBarVars>(searchBarQuery, {
          search: this.value,
        })
        .toPromise();

      if (!resp || !resp.data) {
        this.clearResults();
        return;
      }

      this.setResults(resp.data.bookSuggestion, resp.data.userProfile);
    } catch (err) {
      this.clearResults();
    }
  }

  setResults(bookResults: IBook[], userResult: IUser) {
    this.bookResults = bookResults;
    this.userResult = userResult;
  }

  setShow(val: boolean) {
    this.show = val;
  }
}
export const searchStore = new SearchBarStore();
