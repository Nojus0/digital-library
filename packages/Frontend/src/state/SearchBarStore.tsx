import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";
import { client } from "src/graphql/client";
import { bookSuggestionQuery, IBookSuggestionQuery, IBookSuggestionVars } from "src/graphql/books/bookSuggestion";

class SearchBarStore {
    value: string = ""
    show: boolean = false;
    results: Array<IBook> = []

    constructor() {
        makeAutoObservable(this);
    }

    clearResults() {
        this.results = [];
    }

    setValue(val: string) {
        this.setShow(true);
        this.value = val;
    }

    async fetchSuggestions() {
        const { data } = await client.query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, { search: this.value }).toPromise();
        this.setResults(data.bookSuggestion);
    }

    setResults(val: IBook[]) {
        this.results = val;
    }

    setShow(val: boolean) {
        this.show = val;
    }

}
export const searchStore = new SearchBarStore();