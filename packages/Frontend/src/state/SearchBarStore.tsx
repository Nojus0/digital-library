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

    setValue(val: string) {
        this.value = val;
    }

    async fetchSuggestions() {
        if (searchStore.value.length < 3) return;


        const { data } = await client.query<IBookSuggestionQuery, IBookSuggestionVars>(bookSuggestionQuery, { search: this.value }).toPromise();
        this.results = data.bookSuggestion;
    }

    setShow(val: boolean) {
        this.show = val;
    }

}
export const searchStore = new SearchBarStore();