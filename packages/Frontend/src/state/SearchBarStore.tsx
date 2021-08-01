import { makeAutoObservable } from "mobx";
import { IBook } from "@dl/shared";



class SearchBarStore {
    value: string
    show: boolean
    results: Array<IBook>

    constructor() {
        makeAutoObservable(this);
        this.show = false;
        this.value = "";
        this.results = [];
    }
    
    setValue(val: string) {
        this.value = val;
    }

    setShow(val: boolean) {
        this.show = val;
    }

}
export const searchStore = new SearchBarStore();