import { makeAutoObservable } from "mobx";
import { IBook, Role } from "@dl/shared";
import { client } from "src/graphql/client";
import { IUserProfileQuery, IUserProfileVariables, userProfileQuery } from "src/graphql/user/userProfile";
import { bookSuggestionQuery, IBookSuggestionQuery, IBookSuggestionVars } from "src/graphql/books/addBook";
import { IManageBook } from "src/components/Manage/ManageBook";

interface IManageUser {
    borowing: IBook[]
    username: string
    role: Role
}

class ManageBookStore {
    searchUser: string = ""
    searchBooks: string = ""

    isOpen: boolean = false;

    // userBorowing: IBook[] = []
    bookResults: IBook[] = []
    user: IManageUser = {
        borowing: [],
        username: null,
        role: null
    }
    add: IBook[] = []
    remove: IBook[] = []

    constructor() {
        makeAutoObservable(this);
    }

    async loadUser() {

        const { data } = await client.query<IUserProfileQuery, IUserProfileVariables>(userProfileQuery, { username: this.searchUser }).toPromise();
        if (data.userProfile == null) return this.clearUser();

        this.setUser(data.userProfile)
    }

    async loadResults() {
        const { data } = await client.query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, { search: this.searchBooks }).toPromise()

        if (data.bookSuggestion == null) return this.clearResults();

        this.setBookResults(data.bookSuggestion);
    }

    setBookResults(books: IBook[]) {
        this.bookResults = books;
    }

    setUser(user: IManageUser) {
        this.user = user;
    }

    clearResults() {
        this.bookResults = [];
    }

    clearUser() {
        this.user.borowing = [];
    }

    addBook(addBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (this.user.borowing.some(book => book.id == addBook.id))
            return this.removeBookFromRemoveList(addBook);

        this.add = [...this.add, addBook];
        this.removeBookFromRemoveList(addBook);
    }

    removeBookFromRemoveList(removeBook: IBook) {
        this.remove = this.remove.filter(book => book.id != removeBook.id);
    }

    removeBookFromAddList(addBook: IBook) {
        return this.add = this.add.filter(book => book.id != addBook.id);
    }

    removeBook(removeBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (!this.user.borowing.some(book => book.id == removeBook.id))
            return this.removeBookFromAddList(removeBook);


        this.remove = [...this.remove, removeBook];
        this.removeBookFromAddList(removeBook);
    }

    get results() {
        console.log(JSON.stringify(this.add, null, 2));
        console.log(JSON.stringify(this.remove, null, 2));

        console.log(JSON.stringify(this.user.borowing, null, 2));
        console.log(JSON.stringify(this.bookResults, null, 2));

        if(this.user.username == null) return [];

        const bookResults = this.bookResults.map(bookResult =>
            // * Check if book result is borowed *
            this.user.borowing.some(borowingBook => borowingBook.id == bookResult.id)
                ? { ...bookResult, isBorowing: true }
                : { ...bookResult, isBorowing: false }
        )

        // * Exclude book search results from user borowing books, userBorowing - BookResults *
        const userBooks = this.user.borowing.filter(book =>
            !this.bookResults.some(result => result.id == book.id)
        ).map(
            // * Convert into IManageBook from IBook *
            book => ({ ...book, isBorowing: true } as IManageBook)
        );

        return [...bookResults, ...userBooks].map(book => {

            if (this.add.some(addBook => addBook.id == book.id))
                return ({ ...book, isBorowing: true })
            else if (this.remove.some(removeBook => removeBook.id == book.id))
                return ({ ...book, isBorowing: false })
            else
                return book;
        })


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