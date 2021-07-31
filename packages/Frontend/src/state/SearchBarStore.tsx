import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";



class SearchBarStore {
    value: string
    results: Array<IBook>

    constructor() {
        makeAutoObservable(this);
    }



}
export const searchStore = new SearchBarStore();