import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { observer } from "mobx-react"
import { manageStore } from "src/state/ManageBookStore";
import { Search, SearchInput } from "src/styled/SearchBar";
import SearchSvg from "src/svg/SearchSvg";

function BookSearchBar() {
    return (
        <Search style={{margin: "0 0 1rem 0"}} initial="inactive">
            <SearchSvg
                initial="inactive"
                fill="grey" />
            <SearchInput
                value={manageStore.searchBook}
                onChange={e => manageStore.setBook(e.target.value)}
                initial="inactive"
                placeholder="Search for a book"
            />
        </Search>
    )
}


export default observer(BookSearchBar);