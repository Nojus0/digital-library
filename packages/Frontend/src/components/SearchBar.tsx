import styled from "@emotion/styled";
import React from "react";
import SearchSvg from "src/svg/SearchSvg";

export interface ISearchBarProps {
    state: [string, React.Dispatch<React.SetStateAction<string>>]
}

export function SearchBar({ state: [value, setSearch] }: ISearchBarProps) {
    return (
        <Search>
            <SearchSvg fill="grey" />
            <input value={value} onChange={e => setSearch(e.target.value)} placeholder="Search by Book Name"></input>
        </Search>
    )
}

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