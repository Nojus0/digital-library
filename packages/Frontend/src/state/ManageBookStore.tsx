import { makeAutoObservable } from "mobx";
import { IBook, IUser } from "@dl/shared";
import { client } from "src/graphql/client";
import { IUserProfileQuery, IUserProfileVariables, userProfileQuery } from "src/graphql/user/userProfile";
import { bookSuggestionQuery, IBookSuggestionQuery, IBookSuggestionVars } from "src/graphql/books/addBook";
import { IManageBook } from "src/components/Manage/ManageBook";

class ManageBookStore {
    searchUser: string = ""
    searchBooks: string = ""

    isOpen: boolean = false;

    userBorowing: IBook[] = []
    bookResults: IBook[] = []
    add: IBook[] = []
    remove: IBook[] = []

    constructor() {
        makeAutoObservable(this);
    }

    async loadUser() {
        if (this.searchUser.length < 3) return this.clearUser();

        const { data } = await client.query<IUserProfileQuery, IUserProfileVariables>(userProfileQuery, { username: this.searchUser }).toPromise();
        if (data.userProfile == null) return this.clearUser();

        this.setUserBorowing(data.userProfile.borowing);
    }

    async loadResults() {
        if (this.searchBooks.length < 3) return this.clearResults(); // TODO change in debounce CAUSES extra rerenders
        const { data } = await client.query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, { search: this.searchBooks }).toPromise()

        if (data.bookSuggestion == null) return this.clearResults();

        this.setBookResults(data.bookSuggestion);
    }

    setBookResults(books: IBook[]) {
        this.bookResults = books;
    }

    setUserBorowing(books: IBook[]) {
        this.userBorowing = books;
    }

    clearResults() {
        this.bookResults = [];
    }

    clearUser() {
        this.userBorowing = [];
    }

    addBook(addBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (this.userBorowing.some(book => book.id == addBook.id))
            return this.remove = this.remove.filter(book => book.id != addBook.id);

        this.add = [...this.add, addBook];
        this.remove = this.remove.filter(book => book.id != addBook.id);
    }

    removeBook(removeBook: IBook) {

        // * Check if the user is already borowing the book, no need to send extra data *
        if (!this.userBorowing.some(book => book.id == removeBook.id))
            return this.add = this.add.filter(book => book.id != removeBook.id);


        this.remove = [...this.remove, removeBook];
        this.add = this.add.filter(book => book.id != book.id);
    }

    get results() {
        console.log(JSON.stringify(this.add, null, 2));
        console.log(JSON.stringify(this.remove, null, 2));

        console.log(JSON.stringify(this.userBorowing, null, 2));
        console.log(JSON.stringify(this.bookResults, null, 2));

        const bookResults = this.bookResults.map(bookResult =>
            // * Check if book result is borowed *
            this.userBorowing.some(borowingBook => borowingBook.id == bookResult.id)
                ? { ...bookResult, isBorowing: true }
                : { ...bookResult, isBorowing: false }
        )

        // * Exclude book search results from user borowing books, userBorowing - BookResults *
        const userBooks = this.userBorowing.filter(book =>
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