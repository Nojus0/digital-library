import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";
import { client } from "src/next/graphql";
import { booksQuery, IBooksQuery, IBooksVariables } from "src/graphql/books/books";

class BookStore {
    books: Array<IBook> = []
    page: number = 0;
    limit: number = 10;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    nextPage() {
        this.page += this.limit;
    }

    async loadBooks() {
        const { data, error } = await client.query<IBooksQuery, IBooksVariables>(
            booksQuery, {
            limit: this.limit,
            page: this.page
        }).toPromise();

        if (error != null) return; // TODO add popup

        if (data.books.length < 1) {
            this.hasMore = false;
            return
        }

       this.addBooks(data.books);
    }

    setBook(books: IBook[]) {
        this.books = [...books]
    }

    addBooks(books: IBook[]){
        this.books = [...this.books, ...books];
    }
}

export const bookStore = new BookStore();