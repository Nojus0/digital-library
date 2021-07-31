import styled from "@emotion/styled";
import { observer } from "mobx-react";
import React from "react";
import { searchStore } from "src/state/SearchBarStore";
import SearchSvg from "src/svg/SearchSvg";

function SearchBar() {
    return (
        <Search>
            <SearchSvg fill="grey" />
            <input value={searchStore.value} onChange={e => searchStore.value = e.target.value} placeholder="Search by Book Name"></input>
        </Search>
    )
}

export default observer(SearchBar);

const SearchResult = styled.div({

})

const Search = styled.div({
    display: 'flex',
    background: "#EFEFEF",
    borderRadius: ".4rem",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: "clamp(1px, 100%, 45rem)",
    "svg": {
        padding: "0 0 0 .75rem",
    },
    "input": {
        fontSize: "0.75rem",
        width: "100%",
        margin: "1rem 1rem 1rem .20rem",
        background: "transparent",
        outline: "none",
        border: "none",
    }
})