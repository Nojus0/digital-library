import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";
import { client } from "src/next/graphql";
import { booksQuery, IBooksQuery, IBooksVariables } from "src/graphql/books/books";


class BookStore {
    books: Array<IBook>
    page: number
    limit: number
    hasMore: boolean

    constructor() {
        makeAutoObservable(this);
        this.limit = 10;
        this.page = 0;
        this.hasMore = true;
        this.books = [];
    }

    nextPage() {
        this.page += this.limit;
        this.loadBooks();
    }

    async loadBooks() {
        const { data, error } = await client.query<IBooksQuery, IBooksVariables>(
            booksQuery, {
            limit: this.limit,
            page: this.page
        }).toPromise();

        if (error) return; // TODO add popup

        if (data.books.length != this.limit) return this.hasMore = false;

        this.books = [...this.books, ...data.books];
    }

}

export const bookStore = new BookStore();