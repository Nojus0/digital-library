import { makeAutoObservable, toJS } from "mobx";
import { IBook, Role } from "@dl/shared";
import { client } from "src/graphql/client";
import {
  IUserProfileQuery,
  IUserProfileVariables,
  userProfileQuery,
} from "src/graphql/user/userProfile";
import { IManageBook } from "src/components/Manage/ManageBook";
import {
  IManageUsers,
  IManageUsersVars,
  manageUser,
  ManageUsersMutation,
} from "src/graphql/user/manageUsers";
import {
  bookSuggestionQuery,
  IBookSuggestionQuery,
  IBookSuggestionVars,
} from "src/graphql/books/bookSuggestion";

interface IManageUser {
  username: string;
  borowing: IBook[];

  add: IBook[];
  remove: IBook[];
}

class ManageBookStore {
  searchUser: string = "";
  searchBooks: string = "";

  isOpen: boolean = false;

  bookResults: IBook[] = [];

  // Username / Modify
  users: Map<string, IManageUser> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  async loadUser() {
    const { data, error } = await client
      .query<IUserProfileQuery, IUserProfileVariables>(userProfileQuery, {
        username: this.searchUser,
      })
      .toPromise();
    if (data.userProfile == null || error) return;

    if (!this.users.has(data.userProfile.username)) {
      this.users.set(data.userProfile.username, {
        ...data.userProfile,
        add: [],
        remove: [],
      });
    }
  }

  async loadResults() {
    const { data, error } = await client
      .query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, {
        search: this.searchBooks,
      })
      .toPromise();

    if (data.bookSuggestion == null || error) return this.clearBookResults();

    this.setBookResults(data.bookSuggestion);
  }

  setBookResults(books: IBook[]) {
    this.bookResults = books;
  }

  clearBookResults() {
    this.bookResults = [];
  }

  set current(val: IManageUser) {
    this.users.set(val.username, val);
  }

  get current() {
    return this.users.get(this.searchUser);
  }

  addBook(addBook: IBook) {
    // * Check if the user is already borowing the book, no need to send extra data *
    if (this.current.borowing.some((book) => book.id == addBook.id))
      return this.removeBookFromRemoveList(addBook);

    this.current.add = [...this.current.add, addBook];
    this.removeBookFromRemoveList(addBook);
  }

  removeBookFromRemoveList(removeBook: IBook) {
    this.current.remove = this.current.remove.filter(
      (book) => book.id != removeBook.id
    );
  }

  removeBookFromAddList(addBook: IBook) {
    return (this.current.add = this.current.add.filter(
      (book) => book.id != addBook.id
    ));
  }

  removeBook(removeBook: IBook) {
    // * Check if the user is already borowing the book, no need to send extra data *
    if (!this.current.borowing.some((book) => book.id == removeBook.id))
      return this.removeBookFromAddList(removeBook);

    this.current.remove = [...this.current.remove, removeBook];
    this.removeBookFromAddList(removeBook);
  }

  async confirm() {
    const users: manageUser[] = Array.from(this.users.values()).map(
      ({ username, add, remove }) => ({
        username,
        add: add.map((add) => add.id),
        remove: remove.map((remove) => remove.id),
      })
    );

    if (users.length < 1) return this.close();

    const { data, error } = await client
      .mutation<IManageUsers, IManageUsersVars>(ManageUsersMutation, { users })
      .toPromise();

    if (error || data.manageUsers == null) {
      // TODO make an error message at the top of the screen and centered.
    }
    this.close();
  }

  get results() {
    if (this.current == null) return [];

    const bookResults = this.bookResults.map((bookResult) =>
      // * Check if book result is borowed *
      this.current.borowing.some(
        (borowingBook) => borowingBook.id == bookResult.id
      )
        ? { ...bookResult, isBorowing: true }
        : { ...bookResult, isBorowing: false }
    );

    // * Exclude book search results from user borowing books, userBorowing - BookResults *
    const userBooks = this.current.borowing
      .filter(
        (book) => !this.bookResults.some((result) => result.id == book.id)
      )
      .map(
        // * Convert into IManageBook from IBook *
        (book) => ({ ...book, isBorowing: true } as IManageBook)
      );

    return [...bookResults, ...userBooks].map((book) => {
      if (this.current.add.some((addBook) => addBook.id == book.id))
        return { ...book, isBorowing: true };
      else if (
        this.current.remove.some((removeBook) => removeBook.id == book.id)
      )
        return { ...book, isBorowing: false };
      else return book;
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  setBookSearch(val: string) {
    this.searchBooks = val;
  }

  setUsernameSearch(val: string) {
    this.searchUser = val;
  }
}

export const manageStore = new ManageBookStore();
