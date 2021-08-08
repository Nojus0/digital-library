import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";

class ManageBookStore {
    searchUser: string = ""
    searchBookResults: Array<IBook> = []

    searchBook: string = ""
    userOwnedBooks: Array<IBook> = []
    addBooks: Array<IBook> = []

    isOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    setBook(val: string) {
        this.searchBook = val;
    }

    setUsername(val: string) {
        this.searchUser = val;
    }

    addUserBook(id: number) {

    }

    modify() {

    }

    removeUserBook(id: number) {
        this.userOwnedBooks = this.userOwnedBooks.filter(book => book.id != id);
    }
}

export const manageStore = new ManageBookStore();