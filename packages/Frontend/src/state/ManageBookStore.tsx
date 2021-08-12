import { makeAutoObservable } from "mobx";
import { IBook, Role } from "@dl/shared";
import { client } from "src/graphql/client";
import { IUserProfileQuery, IUserProfileVariables, userProfileQuery } from "src/graphql/user/userProfile";
import { bookSuggestionQuery, IBookSuggestionQuery, IBookSuggestionVars } from "src/graphql/books/addBook";
import { IManageBook } from "src/components/Manage/ManageBook";

interface IManageUser {
    username: string
    role: Role,
    borowing: IBook[]

    add: IBook[]
    remove: IBook[]
}

class ManageBookStore {
    currentUser: string = ""
    searchBooks: string = ""

    isOpen: boolean = false;

    bookResults: IBook[] = []

    // Username / Modify
    users: Record<string, IManageUser> = {};

    constructor() {
        makeAutoObservable(this);
    }

    async loadUser() {

        const { data } = await client.query<IUserProfileQuery, IUserProfileVariables>(userProfileQuery, { username: this.currentUser }).toPromise();
        if (data.userProfile == null) return;

        this.setUser({ ...data.userProfile, add: [], remove: [] });
    }

    async loadResults() {
        const { data } = await client.query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, { search: this.searchBooks }).toPromise()

        if (data.bookSuggestion == null) return this.clearResults();

        this.setBookResults(data.bookSuggestion);
    }

    setBookResults(books: IBook[]) {
        this.bookResults = books;
    }

    setUser(props: IManageUser) {
        if (this.users[props.username] != null) return; // TODO Maybe invalid if changed ...

        this.users[props.username] = props;
    }

    clearResults() {
        this.bookResults = [];
    }

    addBook(addBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (this.users[this.currentUser].borowing.some(book => book.id == addBook.id))
            return this.removeBookFromRemoveList(addBook);

        this.users[this.currentUser].add = [...this.users[this.currentUser].add, addBook];
        this.removeBookFromRemoveList(addBook);
    }

    removeBookFromRemoveList(removeBook: IBook) {
        this.users[this.currentUser].remove = this.users[this.currentUser].remove.filter(book => book.id != removeBook.id);
    }

    removeBookFromAddList(addBook: IBook) {
        return this.users[this.currentUser].add = this.users[this.currentUser].add.filter(book => book.id != addBook.id);
    }

    removeBook(removeBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (!this.users[this.currentUser].borowing.some(book => book.id == removeBook.id))
            return this.removeBookFromAddList(removeBook);


        this.users[this.currentUser].remove = [...this.users[this.currentUser].remove, removeBook];
        this.removeBookFromAddList(removeBook);
    }

    

    get results() {
        if (this.users[this.currentUser] == null) return [];

        console.log(JSON.stringify(this.users, null, 2));
        const bookResults = this.bookResults.map(bookResult =>
            // * Check if book result is borowed *
            this.users[this.currentUser].borowing.some(borowingBook => borowingBook.id == bookResult.id)
                ? { ...bookResult, isBorowing: true }
                : { ...bookResult, isBorowing: false }
        )

        // * Exclude book search results from user borowing books, userBorowing - BookResults *
        const userBooks = this.users[this.currentUser].borowing.filter(book =>
            !this.bookResults.some(result => result.id == book.id)
        ).map(
            // * Convert into IManageBook from IBook *
            book => ({ ...book, isBorowing: true } as IManageBook)
        );

        return [...bookResults, ...userBooks].map(book => {

            if (this.users[this.currentUser].add.some(addBook => addBook.id == book.id))
                return ({ ...book, isBorowing: true })
            else if (this.users[this.currentUser].remove.some(removeBook => removeBook.id == book.id))
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
        this.currentUser = val;
    }
}

export const manageStore = new ManageBookStore();