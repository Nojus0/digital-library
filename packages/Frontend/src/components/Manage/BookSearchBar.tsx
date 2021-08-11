import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { observer } from "mobx-react"
import { manageStore } from "src/state/ManageBookStore";
import { Search, SearchInput } from "src/styled/SearchBar";
import SearchSvg from "src/svg/SearchSvg";

function BookSearchBar() {
    return (
        <StyledBookSearch initial="inactive">
            <SearchSvg
                initial="inactive"
                fill="grey" />
            <SearchInput
                value={manageStore.searchBooks}
                onChange={e => manageStore.setBookSearch(e.target.value)}
                initial="inactive"
                placeholder="Search for a book"
            />
        </StyledBookSearch>
    )
}

const StyledBookSearch = styled(Search)({
    margin: "0 0 1rem 0"
})

export default observer(BookSearchBar);